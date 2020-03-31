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
          Header: 'Имя',
          accessor: 'name',
          Cell: (props) => {
            const name = props.row.original;
            return (
              <>
                <h4>{name}</h4>
                <h4
                  className="text-center btn btn-sm btn-outline-primary"
                  onClick={() => onTagRenameClick(name)}
                >
                  Переименовать
                </h4>
                <h4 className="text-center btn btn-danger btn-sm" onClick={() => onDeleteClick(name)}>
                  Удалить
                </h4>
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
      <h4 className="text-center btn btn-lg btn-outline-primary" onClick={onAddTag}>
        Создать новый тэг
      </h4>
    </>
  );
};

export default TagsPanel;
