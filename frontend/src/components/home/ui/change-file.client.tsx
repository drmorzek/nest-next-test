"use client"

import { FC, SetStateAction } from "react";
import { handleFileChange } from "../utils/home.handler";

interface FileUploadProps {
  setSelectedFile: (value: SetStateAction<File | null>) => void;
}

const ChangeFileComponent: FC<FileUploadProps> = ({  setSelectedFile }) => {
  return (
    <>
          <div className="mb-3">Файл не выбран</div>
          <label htmlFor="file-input" className="btn btn-primary mb-3">
            Выбрать файл
          </label>
          <input
            id="file-input"
            type="file"
            className="form-control visually-hidden"
            onChange={(e) => handleFileChange(e, setSelectedFile)}
          />
        </>
  );
};

export default ChangeFileComponent;