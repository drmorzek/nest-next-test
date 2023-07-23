"use client";

import { useRouter } from "next/router";
import { FC } from "react";

interface FileListProps {
  files?: { id: string; name: string }[];
}

const FileList: FC<FileListProps> = ({ files }) => {
  const router = useRouter();
  if (!files) {
    return <div>No files</div>;
  }

  const handleFileClick = (id: string) => {
    router.push(`/file/${id}`);
  };

  return (
    <ul>
      {files.map((file) => (
        <li key={file.id}>
          <button onClick={() => handleFileClick(file.id)}>{file.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default FileList;
