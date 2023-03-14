import React from 'react';

import './table.scss';

interface TableProps {
  headings: string[];
  data: any[];
}

interface tableHeadTextType {
  [key: string]: string;
  title: string;
  writeDate: string;
}

const Table = ({ headings, data }: TableProps) => {
  const tableHeadText: tableHeadTextType = { title: '제목', writeDate: '게시일' };

  return (
    <table className="custom-table">
      <thead>
        <tr>
          {headings.map((heading: string) => (
            <th key={heading} className={`${heading.toLowerCase().replace(' ', '-')}-heading`}>
              {tableHeadText[heading]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr key={item.boardId}>
            {headings.map((heading: string) => {
              console.log(item);
              return (
                <td key={heading} className={`${heading.toLowerCase().replace(' ', '-')}-data`}>
                  {item[heading]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
