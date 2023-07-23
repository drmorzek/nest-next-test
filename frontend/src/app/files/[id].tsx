import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, Key } from "react";

interface FilePageProps {
  data: any;
}

type CellType =  string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined
type KeyNullUndefined =  Key | null | undefined

const FilePage = ({ data }: FilePageProps) => {
  const router = useRouter();
  const { id } = router.query;

  // Обработка данных динамически
  const columns = Object.keys(data[0] || {});
  const rows = data.map((row: any) =>
    columns.map((column) => row[column])
  );

  return (
    <div>
      <h1>File: {id}</h1>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any[], i: KeyNullUndefined) => (
            <tr key={i}>
              {row.map((cell: CellType, j: KeyNullUndefined) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<FilePageProps> = async (
  context
) => {
  const { id } = context.params as { id: string };

  // Загрузка данных с сервера
  const response = await fetch(`http://localhost:3000/api/file/${id}`);
  const data = await response.json();

  // Возврат данных в качестве пропсов
  return {
    props: {
      data,
    },
  };
};

export default FilePage;