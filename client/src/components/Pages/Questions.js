/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserLoginStatus, getAllQuestions, getAllArticles, getUserInfo, getAllTags,
} from '../../actions';
import { formatDetailedDateTime } from '../../helpers/helpers';
import radixSort from '../../helpers/radixSort';

const Questions = () => {
  const questions = useSelector((store) => store.questions);
  const [length, setLength] = useState(10);
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const onClick = async () => {
    await dispatch(getAllQuestions());
    setLength(length + 10);
  };

  const handleChange = (e) => setQuery(e.target.value.trim().toLowerCase());

  useEffect(() => {
    (async () => {
      await dispatch(getAllQuestions());
      setPending(false);
    })();
  }, [dispatch]);

  if (pending) {
    return <h1 className="text-center">Загрузка...</h1>;
  }

  if (Object.values(questions).length < 1) {
    return <h1 className="text-center">Ничего не найдено</h1>;
  }

  const formattedQuestions = radixSort(Object.values(questions), 'id', false)
    .filter((question) => question.title.toLowerCase().indexOf(query) > -1)
    .slice(0, length);

  return (
    <div className="container">
      <input
        className="form-control"
        type="search"
        placeholder="Поиск по названиям вопросов"
        aria-label="Search"
        onChange={handleChange}
      />
      {formattedQuestions.map((question) => {
        const {
          id,
          title,
          body,
          creation_date,
          tags,
          closed,
          only_chosen_tags,
          only_experts_answer,
        } = question;

        return (
          <div className="card mb-3 mt-3" key={id}>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                {body}
              </p>
              <h5 className="text-muted text-left">
                {closed ? 'Вопрос закрыт' : ''}
              </h5>
              <h5 className="text-muted text-left">
                {only_experts_answer ? 'Вопрос только для экспертов' : ''}
              </h5>
              <h5 className="text-muted text-left">
                {only_chosen_tags ? 'Вопрос только для экспертов из указанных научных областей' : ''}
              </h5>
              <Link
                to={{
                  pathname: `/questions/${id}`,
                  state: question,
                }}
                className="card-link btn btn-outline-primary"
              >
                Подробности
              </Link>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-8 text-center">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      to="/"
                      className="badge badge-primary"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                <div className="col-4 col-4 text-muted text-center">
                  {formatDetailedDateTime(creation_date)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {!query && (length < Object.values(questions).length)
            && (
            <button
              type="button"
              className="btn btn-dark mb-5"
              onClick={onClick}
            >
              Загрузить еще
            </button>
            )}
      {formattedQuestions.length === 0 && <div className="text-center">Ничего не найдено</div>}
    </div>
  );
};

export default Questions;
