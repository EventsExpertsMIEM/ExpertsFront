/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserLoginStatus, getAllQuestions, getAllArticles, getUserInfo,
} from '../../actions';
import { formatDetailedDateTime } from '../helpers/helpers';
import radixSort from '../helpers/radixSort';
import Table from '../Profile/Table';

const MainPage = () => {
  const questions = useSelector((store) => store.questions);
  const user = useSelector((store) => store.user);
  const [length, setLength] = useState(10);
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const onClick = async () => {
    await dispatch(getAllQuestions());
    setLength(length + 10);
  };

  const handleChange = (e) => setQuery(e.target.value.trim().toLowerCase());

  useEffect(() => {
    (async () => {
      await dispatch(getAllQuestions());
      await dispatch(getAllArticles());
      const res = await dispatch(getUserLoginStatus());
      if (user.isLoggedIn && res.info && res.info.id) {
        await dispatch(getUserInfo(res.info.id));
      }
    })();
  }, [dispatch, user.isLoggedIn]);

  if (Object.values(questions).length < 1) {
    return (
      <div className="text-center">
        <h1>Загрузка...</h1>
      </div>
    );
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
          closed,
          only_experts_answer: onlyExpertsAnswer,
          only_chosen_tags: onlyChosenTags,
          id,
          u_id: userId,
          email,
          title,
          body,
          creation_date: creationDate,
          score,
          view_count: viewCount,
          comment_count: commentCount,
          tags,
        } = question;

        return (
          <div className="card mb-3 mt-3" key={id}>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                {body}
              </p>
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

                <div className="col-lg-10 col-md-10 col-sm-10 text-center">
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
                <div className="col-lg-2 col-md-2 col-sm-2 text-muted text-center">
                  {formatDetailedDateTime(creationDate)}
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

export default MainPage;
