import { GetServerSideProps } from "next";
import FileList from "@/components/filelist/filelist.client";

interface FilesPageProps {
  files: { id: string; name: string }[];
}

const FilesPage = ({ files }: FilesPageProps) => {
  return <FileList files={files} />;
};

export const getServerSideProps: GetServerSideProps<FilesPageProps> = async (
  context
) => {
  // Загрузка данных с сервера
  const response = await fetch("http://localhost:3000/api/files");
  const data = await response.json();

  // Возврат данных в качестве пропсов
  return {
    props: {
      files: data.files,
    },
  };
};

export default FilesPage;
