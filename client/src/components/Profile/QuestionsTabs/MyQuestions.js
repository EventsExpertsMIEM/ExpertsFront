/* eslint-disable react/jsx-props-no-spreading, no-shadow,react/prop-types,
 react/destructuring-assignment */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../Table';
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
          const { status } = props.row.original;
          return (<div>{dict[status] || status}</div>);
        },
      },
    ],
  },
];


const MyQuestions = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.table.questions);

  useEffect(() => {
    dispatch(getUserQuestions(props.user.id));
  }, [dispatch, props.user.id]);
  return (
  // eslint-disable-next-line react/destructuring-assignment
    <Table data={data} columns={columns} id={props.user.id} />
  );
};

export default MyQuestions;
