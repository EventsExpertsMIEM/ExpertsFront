/* eslint-disable react/prop-types, react/destructuring-assignment,
 jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  banUser, changeRole, getAllUsers, ROLES,
} from '../../../actions';
import Table from '../Table';
import requireRights from '../../requireRights';

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
const AdminPanel = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.table.users);
  const onBanClick = async (id) => {
    await dispatch(banUser(id));
    await dispatch(getAllUsers());
  };
  const onRoleChangeClick = async (id, role) => {
    await dispatch(changeRole(id, role));
    await dispatch(getAllUsers());
  };

  const isBanned = (status) => status === 'banned';
  const disabled = (status) => (isBanned(status) ? 'disabled' : undefined);
  const onBan = (status, id) => (isBanned(status) ? undefined : () => onBanClick(id));
  const onOpenProfile = (id) => {
    alert(JSON.stringify(data[data.length - id], null, 4));
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllUsers());
    })();
  }, [dispatch]);

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
            const { role, status, id } = props.row.original;
            return (
              <div>
                <h4 className="text-center">{`Роль: ${role}`}</h4>
                <h4 className="text-center">{`Статус: ${status}`}</h4>
                <select
                  className="form-control"
                  onChange={(e) => onRoleChangeClick(id, e.target.value)}
                >
                  <option value="" defaultValue readOnly>Изменить роль</option>
                  {Object.values(ROLES).map((el) => (
                    el !== ROLES.SUPERADMIN && (
                    <option
                      key={el}
                      value={el}
                      disabled={el === role}
                    >
                      {el}
                    </option>
                    )
                  ))}
                </select>
                <h4
                  className={`text-center page-link btn btn-danger ${disabled(status)}`}
                  onClick={onBan(status, id)}
                >
                  Забанить
                </h4>
                <h4 className="text-center page-link btn" onClick={() => onOpenProfile(id)}>Подробнее</h4>
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
