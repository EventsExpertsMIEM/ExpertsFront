/* eslint-disable react/prop-types, react/destructuring-assignment,
 jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from 'react-bootstrap-dialog';
import {
  banUser, changeRole, getAllUsers, ROLES,
} from '../../../../actions';
import Table from '../../../Table/Table';
import requireRights from '../../../HOCs/requireRights';
import TagsPanel from './TagsPanel';
import { formatModalData } from '../../../../helpers/helpers';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.table.users);

  const onBanClick = async (id) => {
    await dispatch(banUser(id));
    await dispatch(getAllUsers());
  };
  const ref = useRef(null);

  const onRoleChangeClick = async (id, role) => {
    await dispatch(changeRole(id, role));
    await dispatch(getAllUsers());
  };

  const isBanned = (status) => status === 'banned';
  const onBan = (status, id) => (isBanned(status) ? undefined : () => onBanClick(id));
  const onOpenProfile = (id) => {
    ref.current.showAlert(formatModalData(data[data.length - id]));
  };

  useEffect(() => {
    (async () => {
      await dispatch(getAllUsers());
    })();
  }, [dispatch]);

  const columns = [
    {
      Header: 'Пользователи',
      columns: [
        {
          Header: 'Email',
          accessor: 'email',
          Cell: (props) => {
            const { email } = props.row.original;
            return email;
          },
        },
        {
          Header: 'Статус',
          accessor: 'role',
          Cell: (props) => {
            const { role, status, id } = props.row.original;
            return (
              <div>
                <h5 className="text-center">{`Статус: ${status}`}</h5>
                <h5 className="text-center">{`Роль: ${role}`}</h5>
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
              </div>
            );
          },
        },
        {
          Header: 'Управление',
          accessor: 'actions',
          Cell: (props) => {
            const { status, id } = props.row.original;
            return (
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-info b-block mb-3"
                  onClick={() => onOpenProfile(id)}
                >
                  Подробнее
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger d-block"
                  disabled={isBanned(status)}
                  onClick={onBan(status, id)}
                >
                  Заблокировать
                </button>
              </>
            );
          },
        },
      ],
    },
  ];

  return (
    <>
      <Dialog ref={ref} />
      <TagsPanel />
      <Table data={data} columns={columns} />
    </>
  );
};

export default requireRights(AdminPanel);
