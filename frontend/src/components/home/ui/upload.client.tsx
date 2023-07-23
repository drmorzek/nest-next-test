"use client"

import { FC, SetStateAction } from "react";
import { handleCancel, handleUpload } from "../utils/home.handler";

interface FileUploadProps {
  selectedFile: File | null;
  setSelectedFile: (value: SetStateAction<File | null>) => void;
}

const UploadFileComponent: FC<FileUploadProps> = ({ selectedFile, setSelectedFile }) => {
  return (
    <>
      <div className="mb-3">{selectedFile?.name}</div>
      <div>
        <button
          className="btn btn-primary me-3"
          onClick={() => handleUpload(selectedFile, setSelectedFile)}
        >
          Загрузить
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleCancel(setSelectedFile)}
        >
          Отменить
        </button>
      </div>
    </>
  );
};

export default UploadFileComponent;