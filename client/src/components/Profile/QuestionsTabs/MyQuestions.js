/* eslint-disable react/jsx-props-no-spreading, no-shadow,react/prop-types,
 react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../Table';

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
          return (<Link to={`/questions/${id}`}>{title}</Link>);
        },
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: (props) => {
          const { status } = props.row.original;
          return (<div>{dict[status] || status}</div>);
        },
      },
    ],
  },
];


const MyQuestions = (props) => {
  const { questions } = props;

  return (
    <Table data={questions} columns={columns} id={props.user.id} />
  );
};

export default MyQuestions;
