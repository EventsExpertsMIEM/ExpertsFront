/* eslint-disable react/jsx-props-no-spreading, no-shadow,react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';

const columns = [
  {
    Header: 'Мои вопросы',
    columns: [
      {
        Header: 'Тема вопросов',
        accessor: 'id',
      },
      {
        Header: 'Статус',
        accessor: 'status',
      },
    ],
  },
];

const data = [{
  id: <Link to="/">Вопрос 1</Link>,
  status: 'Открыт',
}, {
  id: <Link to="/">Вопрос 2</Link>,
  status:
  <div>
    Новые ответы
    <span className="badge badge-light"> 1 </span>
  </div>,
},
{
  id: <Link to="/">Вопрос 3</Link>,
  status: 'Открыт',
},
{
  id: <Link to="/">Вопрос 4</Link>,
  status: 'Закрыт',
},
];

const Table = (props) => {
  const { columns, data } = props;
  // Use the state and functions returned from useTable to build your UI
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

  console.log(headerGroups);

  return (
    <div className="tab-pane fade mt-3 active show">
      <table {...getTableProps()} className="table">
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

const MyQuestions = () => (
  <Table columns={columns} data={data} />
);

export default MyQuestions;
