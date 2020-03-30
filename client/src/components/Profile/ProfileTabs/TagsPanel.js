/* eslint-disable react/prop-types, react/destructuring-assignment,
 jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions, no-shadow */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTagName,
  createTag, deleteTag, getAllTags, getTagInfo,
} from '../../../actions';
import Table from '../Table';
import { formatModalData } from '../../helpers/helpers';

const TagsPanel = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.tags);

  const onAddTag = async () => {
    const res = prompt('Введите название тэга');
    if (typeof res === 'string') {
      await dispatch(createTag(res));
      await dispatch(getAllTags());
    }
  };

  const onTagClick = async (id) => {
    const res = await dispatch(getTagInfo(id));
    ref.current.showAlert(formatModalData(res));
  };

  const onTagRenameClick = async (id) => {
    const text = prompt('Введите новое название тэга');
    if (typeof text === 'string') {
      await dispatch(changeTagName(id, text));
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
          Header: 'Id',
          accessor: 'id',
          Cell: (props) => {
            const { id } = props.row.original;
            return (<>{id}</>);
          },
        },
        {
          Header: 'Имя',
          accessor: 'name',
          Cell: (props) => {
            const { id, name } = props.row.original;
            return (
              <>
                <h4>{name}</h4>
                <h4
                  className="text-center btn btn-sm btn-outline-primary"
                  onClick={() => onTagClick(id)}
                >
                  Подробнее
                </h4>
                <h4
                  className="text-center btn btn-sm btn-outline-primary"
                  onClick={() => onTagRenameClick(id)}
                >
                  Переименовать
                </h4>
                <h4 className="text-center btn btn-danger btn-sm" onClick={() => onDeleteClick(id)}>
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
});

export default TagsPanel;
