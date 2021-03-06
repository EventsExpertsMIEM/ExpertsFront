/* eslint-disable react/jsx-props-no-spreading, no-shadow,react/prop-types,
 react/destructuring-assignment */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialize, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { FIELD_NAMES } from '../../../../helpers/consts';
import {
  deleteArticle, getAllTags, getArticle, getUserArticles, updateArticle,
} from '../../../../actions';
import { mapTagsToSelected, scrollToRef } from '../../../../helpers/helpers';
import MyPublications from './MyPublications';
import CreateArticle from '../../../Publications/Article/CreateArticle';

const dict = {
  active: 'Открыт',
  closed: 'Закрыт',
};

const getColumns = (ref, toggleShow) => [
  {
    Header: 'Мои статьи',
    columns: [
      {
        Header: 'Тема статьи',
        accessor: 'id',
        Cell: (props) => {
          const { title, id } = props.row.original;
          return (
            <Link to={`/articles/${id}`}>{title}</Link>
          );
        },
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: (props) => {
          const { status } = props.row.original;

          return <div>{dict[status] || status}</div>;
        },
      },
      {
        Header: 'Действия',
        accessor: 'actions',
        Cell: (props) => {
          const { id } = props.row.original;

          const dispatch = useDispatch();
          const articles = useSelector((store) => store.articles);
          const tags = useSelector((store) => store.tags);
          const user = useSelector((store) => store.user);

          const onInitializeClick = (id) => {
            const article = articles[id];
            if (!tags || !article) {
              return undefined;
            }

            return dispatch(initialize(FIELD_NAMES.ARTICLE,
              {
                ...article,
                tags: {
                  ...mapTagsToSelected(tags, false),
                  ...mapTagsToSelected(article.tags, true),
                },
              }));
          };

          const handleDeleteClick = async (id) => {
            await dispatch(deleteArticle(id));
          };

          const executeScroll = () => scrollToRef(ref);
          return (
            <>
              <button
                className="btn btn-outline-warning d-block btn-sm"
                type="button"
                onClick={() => {
                  toggleShow(true);
                  onInitializeClick(id);
                  executeScroll();
                }}
              >
                Редактировать
              </button>
              <button
                className="btn btn-outline-danger d-block btn-sm mt-3"
                type="button"
                onClick={async () => {
                  await handleDeleteClick(id);
                  await dispatch(getUserArticles(user.id));
                }}
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

const MyArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((store) => store.table.articles);
  const article = useSelector((store) => store.form[FIELD_NAMES.ARTICLE]
        && store.form[FIELD_NAMES.ARTICLE].values);
  const [showEdit, toggleShow] = useState(false);

  const history = useHistory();
  const ref = useRef(null);

  const columns = getColumns(ref, toggleShow);

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(updateArticle(article));
    await dispatch(reset(FIELD_NAMES.ARTICLE));
    await dispatch(getArticle(article.id));
    history.push(`/articles/${article.id}`);
  };

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  const editComponent = () => (
    <CreateArticle
      onClick={onClick}
      scrollRef={ref}
      title="Редактировать вопрос"
    />
  );

  return (
    <MyPublications
      data={articles}
      columns={columns}
      showEdit={showEdit}
      editComponent={editComponent}
    />
  );
};

export default MyArticles;
