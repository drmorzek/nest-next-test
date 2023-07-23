import { SetStateAction } from "react";

export const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setSelectedFile: (value: SetStateAction<File | null>) => void
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  export const handleUpload = async function (
    selectedFile: File | null,
    setSelectedFile: (value: SetStateAction<File | null>) => void
  ) {
    if (!selectedFile) {
      alert("Please select a file!");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Upload failed!");
      }
  
      alert("Upload successful!");
      setSelectedFile(null);
    } catch (error) {
      alert(error);
    }
  };
  
  export const handleCancel = (
    setSelectedFile: (value: SetStateAction<File | null>) => void
  ) => {
    setSelectedFile(null);
  };