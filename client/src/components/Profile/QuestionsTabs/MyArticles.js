/* eslint-disable react/jsx-props-no-spreading, no-shadow,react/prop-types,
 react/destructuring-assignment */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialize, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { FIELD_NAMES } from '../../helpers/consts';
import {
  deleteArticle, getUserArticles, updateArticle,
} from '../../../actions';
import { normalizeTags, scrollToRef } from '../../helpers/helpers';
import MyPublications from './MyPublications';
import CreateArticle from '../../Article/CreateArticle';

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
          const { status, id } = props.row.original;

          const dispatch = useDispatch();
          const articles = useSelector((store) => store.articles);
          const tags = useSelector((store) => store.tags);
          const user = useSelector((store) => store.user);

          const onInitializeClick = (id) => {
            const article = articles[id];
            if (!tags) {
              return undefined;
            }

            const normalizedTags = normalizeTags(tags);
            return dispatch(initialize(FIELD_NAMES.ARTICLE,
              { ...article, tags: article.tags.map((tag) => normalizedTags[tag]) }));
          };

          const handleDeleteClick = async (id) => {
            await dispatch(deleteArticle(id));
          };

          const executeScroll = () => scrollToRef(ref);
          return (
            <>
              <div>{dict[status] || status}</div>
              <button
                className="btn btn-primary btn-sm"
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
                className="btn btn-danger btn-sm"
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

  const onClick = () => {
    dispatch(updateArticle(article));
    dispatch(reset(FIELD_NAMES.ARTICLE));
    history.push(`/articles/${article.id}`);
  };

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
