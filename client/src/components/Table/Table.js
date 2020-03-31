/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React from 'react';
import { useTable } from 'react-table';

const Table = (props) => {
  const { columns, data } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  if (!data.length) {
    return <h4 className="text-center">Вопросы не найдены</h4>;
  }

  return (
    <div className="mt-3">
      <table {...getTableProps()} className="table text-center">
        <thead className="thead-light">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
