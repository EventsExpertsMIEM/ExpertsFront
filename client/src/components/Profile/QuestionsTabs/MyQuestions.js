/* eslint-disable react/jsx-props-no-spreading, no-shadow,react/prop-types,
 react/destructuring-assignment */
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialize, reset } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Table from '../Table';
import CreateQuestion from '../../Question/CreateQuestion';
import { FIELD_NAMES } from '../../helpers/consts';
import { deleteQuestion, getUserQuestions, updateQuestion } from '../../../actions';

const dict = {
  active: 'Открыт',
  closed: 'Закрыт',
};

const normalizeTags = (tags) => tags.reduce((acc, tag) => {
  acc[tag.name] = tag;
  return acc;
}, {});

const scrollToRef = (ref) => {
  setTimeout(() => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 10);
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
          const { status, id } = props.row.original;

          const dispatch = useDispatch();
          const questions = useSelector((store) => store.questions);
          const tags = useSelector((store) => store.tags);
          const user = useSelector((store) => store.user);

          const onInitializeClick = (id) => {
            const question = questions[id];
            if (!tags) {
              return undefined;
            }

            const normalizedTags = normalizeTags(tags);
            return dispatch(initialize(FIELD_NAMES.QUESTION,
              { ...question, tags: question.tags.map((tag) => normalizedTags[tag]) }));
          };

          const handleDeleteClick = async (id) => {
            await dispatch(deleteQuestion(id));
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


const MyQuestions = (props) => {
  const dispatch = useDispatch();
  const questions = useSelector((store) => store.table.questions);
  const question = useSelector((store) => store.form[FIELD_NAMES.QUESTION]
        && store.form[FIELD_NAMES.QUESTION].values);
  const [showEdit, toggleShow] = useState(false);

  const history = useHistory();
  const ref = useRef(null);

  const columns = getColumns(ref, toggleShow);

  const onClick = () => {
    dispatch(updateQuestion(question));
    dispatch(reset(FIELD_NAMES.QUESTION));
    history.push(`/questions/${question.id}`);
  };

  return (
    <>
      <Table data={questions} columns={columns} id={props.user.id} />
      <div className={showEdit ? 'd-block' : 'd-none'}><CreateQuestion onClick={onClick} scrollRef={ref} title="Редактировать вопрос" /></div>
    </>
  );
};

export default MyQuestions;
