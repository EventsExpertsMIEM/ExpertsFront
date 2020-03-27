/* eslint-disable react/prop-types, react/destructuring-assignment */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../actions';
import Table from '../Table';
import requireRights from '../../requireRights';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.table.users);

  useEffect(() => {
    (async () => {
      await dispatch(getAllUsers());
    })();
  }, [dispatch]);
  /*  const example = {
    id: 30,
    name: 'F',
    surname: 'F',
    email: 'ff@ff.ff',
    role: 'user',
    tags: [],
    interests: [],
    position: 'F',
    rating: 0,
    registration_date: 1585309843.295268,
    status: 'active',
    question_count: 0,
    article_count: 0,
    comment_count: 0,
  }; */

  const columns = [
    {
      Header: 'Мои вопросы',
      columns: [
        {
          Header: 'Email',
          accessor: 'email',
          Cell: (props) => {
            const { email } = props.row.original;
            return (<div>{email}</div>);
          },
        },
        {
          Header: 'Статус',
          accessor: 'role',
          Cell: (props) => {
            const { role } = props.row.original;
            return (
              <div>
                {role}
                <div>Изменить роль</div>
                <div>Забанить</div>
                <div>Перейти в профиль</div>
              </div>
            );
          },
        },
      ],
    },
  ];

  return <Table data={data} columns={columns} />;
};

export default requireRights(AdminPanel);
