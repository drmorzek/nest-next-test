import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadedFileEntity } from './file.entity';
import { ReadStream } from 'fs';
import * as XLSX from 'xlsx';
import { FileUpload } from 'graphql-upload-ts';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadedFileEntity)
    private readonly uploadsRepository: Repository<UploadedFileEntity>,
  ) {}

  private readStream(createReadStream: () => ReadStream) {
    return new Promise((res, rej) => {
      const readStream = createReadStream();

      const chunks = [];
      readStream.on('data', (chunk) => chunks.push(chunk));
      readStream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        // const workbook = XLSX.readFile('./Пример шаблона.xlsx');

        const workbookJSON = {};

        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          workbookJSON[sheetName] = json;
        }

        res(workbookJSON);
      });
      readStream.on('error', (err) => {
        rej(err);
      });
    });
  }

  async saveFile(fileData: FileUpload) {
    const { createReadStream, filename } = fileData;
    // const { createReadStream, filename } = fileData;

    const data = await this.readStream(createReadStream);
    const newFile = this.uploadsRepository.create();
    newFile.uuid = uuidv4();
    newFile.filename = filename;
    newFile.data = data;
    return await this.uploadsRepository.save(newFile);
  }

  async getUploads() {
    return await this.uploadsRepository.find();
  }

  async getUploadById(uuid: string) {
    return await this.uploadsRepository.findOne({ where: { uuid } });
  }
}
