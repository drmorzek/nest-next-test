"use client"

import { FC,  useState } from "react";
import UploadFileComponent from "./ui/upload.client";
import ChangeFileComponent from "./ui/change-file.client";

const ClientComponent: FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  

  return (
    <div className="d-flex flex-column align-items-center">
      {selectedFile ? (
        <UploadFileComponent selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      ) : (
        <ChangeFileComponent setSelectedFile={setSelectedFile}/>
      )}
    </div>
  );
};


export default ClientComponent;