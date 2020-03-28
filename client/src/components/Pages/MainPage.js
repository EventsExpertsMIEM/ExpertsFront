/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLoginStatus, getAllQuestions, getAllArticles } from '../../actions';
import { formatDetailedDateTime } from '../helpers/helpers';
import radixSort from '../helpers/radixSort';

const MainPage = () => {
  // eslint-disable-next-line no-unused-vars
  const questions = useSelector((store) => store.questions);
  const articles = useSelector((store) => store.articles);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const onClick = () => dispatch(getAllQuestions());

  useEffect(() => {
    (async () => {
      await dispatch(getAllQuestions());
      await dispatch(getAllArticles());
      await dispatch(getUserLoginStatus());
    })();
  }, [dispatch, user.isLoggedIn]);

  if (Object.values(questions).length < 1) {
    return (
      <div className="text-center">
        <h1>Загрузка...</h1>
      </div>
    );
  }
  console.log(articles, questions);

  let elements = questions;

  // TODO: delete
  if (false) {
    elements = articles;
  }

  return (
    <div className="container">
      {radixSort(Object.values(elements), 'id', false).map((question) => {
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
                  pathname: `/info/${id}`,
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
                  {tags.map((tag) => <Link key={tag} to="/" className="badge badge-primary">{tag}</Link>)}
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 text-muted text-center">
                  {formatDetailedDateTime(creationDate)}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        className="btn btn-dark"
        onClick={onClick}
      >
        Загрузить еще
      </button>
    </div>
  );
};

export default MainPage;
