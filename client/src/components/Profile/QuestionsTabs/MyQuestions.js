/* eslint-disable react/jsx-props-no-spreading, no-shadow,react/prop-types,
 react/destructuring-assignment */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { getUserQuestions } from '../../../actions';

const dict = {
  active: 'Открыт',
  closed: 'Закрыт',
};

const columns = [
  {
    Header: 'Мои вопросы',
    columns: [
      {
        Header: 'Тема вопросов',
        accessor: 'id',
        Cell: (props) => {
          const { title, id } = props.row.original;
          return (<Link to={`/info/${id}`}>{title}</Link>);
        },
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: (props) => {
          console.log(props);
          const { status } = props.row.original;
          return (<div>{dict[status] || status}</div>);
        },
      },
    ],
  },
];

const Table = (props) => {
  const dispatch = useDispatch();
  const tableData = useSelector((store) => store.table);
  console.log('tableData', tableData);

  useEffect(() => {
    dispatch(getUserQuestions(props.id));
  }, []);


  const { columns } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: tableData,
  });

  if (!tableData) {
    return <div>Вопросы не найдены</div>;
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

const MyQuestions = (props) => (
  // eslint-disable-next-line react/destructuring-assignment
  <Table columns={columns} id={props.user.id} />
);

export default MyQuestions;
