/* eslint-disable react/prop-types, react/destructuring-assignment,
 jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions, no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTagName, createTag, deleteTag, getAllTags,
} from '../../../../actions';
import Table from '../../../Table/Table';

const TagsPanel = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.tags);

  const onAddTag = async () => {
    const res = prompt('Введите название тэга');
    if (typeof res === 'string') {
      await dispatch(createTag(res));
      await dispatch(getAllTags());
    }
  };

  const onTagRenameClick = async (oldName) => {
    const newName = prompt('Введите новое название тэга');
    if (typeof newName === 'string') {
      await dispatch(changeTagName(oldName, newName));
      await dispatch(getAllTags());
    }
  };

  const onDeleteClick = async (id) => {
    await dispatch(deleteTag(id));
    await dispatch(getAllTags());
  };

  const columns = [
    {
      Header: 'Научные области (тэги)',
      columns: [
        {
          Header: 'Название',
          accessor: 'name',
          Cell: (props) => {
            const name = props.row.original;
            return <h5>{name}</h5>;
          },
        },
        {
          Header: 'Действия',
          accessor: 'actions',
          Cell: (props) => {
            const name = props.row.original;
            return (
              <>
                <button
                  type="button"
                  className="text-center btn btn-sm d-block btn-outline-dark"
                  onClick={() => onTagRenameClick(name)}
                >
                  Переименовать
                </button>
                <button
                  type="button"
                  className="text-center btn btn-outline-danger d-block btn-sm mt-3"
                  onClick={() => onDeleteClick(name)}
                >
                  Удалить
                </button>
              </>
            );
          },
        },
      ],
    },
  ];


  useEffect(() => {
    (async () => {
      await dispatch(getAllTags());
    })();
  }, [dispatch]);

  return (
    <>
      <Table data={data} columns={columns} />
      <h5 className="text-center btn btn-lg btn-outline-primary mb-2" onClick={onAddTag}>
        Создать новый тэг
      </h5>
      <hr />
    </>
  );
};

export default TagsPanel;
