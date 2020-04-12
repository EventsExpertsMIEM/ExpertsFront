/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React from 'react';
import { useTable } from 'react-table';
import BTable from 'react-bootstrap/Table';

const Table = (props) => {
  const { columns, data } = props;
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <BTable striped bordered hover size="lg" {...getTableProps()}>
      <thead className="text-center">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <th {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </th>
              ))}
            </tr>
          );
        })}
      </tbody>
    </BTable>
  );
};

export default Table;
