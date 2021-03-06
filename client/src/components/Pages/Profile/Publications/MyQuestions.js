/* eslint-disable react/jsx-props-no-spreading, no-shadow,react/prop-types,
 react/destructuring-assignment */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialize, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { FIELD_NAMES } from '../../../../helpers/consts';
import {
  deleteQuestion, getAllTags, getQuestion, getUserQuestions, updateQuestion,
} from '../../../../actions';
import { mapTagsToSelected, scrollToRef } from '../../../../helpers/helpers';
import MyPublications from './MyPublications';
import CreateQuestion from '../../../Publications/Question/CreateQuestion';

const dict = {
  active: 'Открыт',
  closed: 'Закрыт',
};

const getColumns = (ref, toggleShow) => [
  {
    Header: 'Мои вопросы',
    columns: [
      {
        Header: 'Тема вопросов',
        accessor: 'id',
        Cell: (props) => {
          const { title, id } = props.row.original;
          return (
            <Link to={`/questions/${id}`}>{title}</Link>
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
        Header: 'Дейсвтия',
        accessor: 'actions',
        Cell: (props) => {
          const { id } = props.row.original;

          const dispatch = useDispatch();
          const questions = useSelector((store) => store.questions);
          const tags = useSelector((store) => store.tags);
          const user = useSelector((store) => store.user);

          const onInitializeClick = (id) => {
            const question = questions[id];
            if (!tags || !question) {
              return undefined;
            }
            return dispatch(initialize(FIELD_NAMES.QUESTION,
              {
                ...question,
                tags: {
                  ...mapTagsToSelected(tags, false),
                  ...mapTagsToSelected(question.tags, true),
                },
              }));
          };

          const handleDeleteClick = async (id) => {
            await dispatch(deleteQuestion(id));
          };

          const executeScroll = () => scrollToRef(ref);
          return (
            <>
              <button
                className="btn btn-outline-warning btn-sm d-block"
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
                className="btn btn-outline-danger btn-sm d-block mt-3"
                type="button"
                onClick={async () => {
                  await handleDeleteClick(id);
                  await dispatch(getUserQuestions(user.id));
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

const MyQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.table.questions);
  const question = useSelector((store) => store.form[FIELD_NAMES.QUESTION]
        && store.form[FIELD_NAMES.QUESTION].values);
  const [showEdit, toggleShow] = useState(false);

  const history = useHistory();
  const ref = useRef(null);

  const columns = getColumns(ref, toggleShow);

  const onClick = async (e) => {
    e.preventDefault();
    await dispatch(updateQuestion(question));
    await dispatch(reset(FIELD_NAMES.QUESTION));
    await dispatch(getQuestion(question.id));
    history.push(`/questions/${question.id}`);
  };

  const editComponent = () => (
    <CreateQuestion
      onClick={onClick}
      scrollRef={ref}
      title="Редактировать вопрос"
    />
  );

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  return (
    <MyPublications
      data={questions}
      columns={columns}
      showEdit={showEdit}
      editComponent={editComponent}
    />
  );
};

export default MyQuestions;
