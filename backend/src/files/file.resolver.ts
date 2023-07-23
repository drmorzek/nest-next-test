import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UploadService } from './file.service';
import { UploadObjectType } from './file.object-type';

import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@Resolver()
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}

  @Query(() => [UploadObjectType], { name: 'uploads' })
  async getUploads() {
    return this.uploadService.getUploads();
  }

  @Query(() => UploadObjectType, { name: 'upload' })
  async getUploadById(@Args('uuid') id: string) {
    return this.uploadService.getUploadById(id);
  }

  @Mutation(() => UploadObjectType)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<any> {
    try {
      return this.uploadService.saveFile(file);
    } catch (e) {
      return false;
    }
  }
}
