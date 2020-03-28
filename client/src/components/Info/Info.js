/* eslint-disable react/prop-types, react/destructuring-assignment, no-unused-vars, no-shadow */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQuestionComments,
  toggleQuestionDownvote,
  getUserLoginStatus,
  toggleQuestionUpvote,
  getQuestion,
  increaseQuestionViews,
  getArticleComments,
  increaseArticleViews,
  toggleArticleDownvote,
  getArticle,
  toggleArticleUpvote,
} from '../../actions';
import { formatDetailedDateTime, renderInputField, renderTextareaField } from '../helpers/helpers';
import CommentGroup from './CommentGroup/index';
import { subjectsName } from '../../actions/types';

const mapSubjToActions = {
  questions: {
    getSubj: getQuestion,
    getComments: getQuestionComments,
    increaseViews: increaseQuestionViews,
    toggleUpvote: toggleQuestionUpvote,
    toggleDownvote: toggleQuestionDownvote,
    subjectsName: subjectsName.questions,
  },
  articles: {
    getSubj: getArticle,
    getComments: getArticleComments,
    increaseViews: increaseArticleViews,
    toggleUpvote: toggleArticleUpvote,
    toggleDownvote: toggleArticleDownvote,
    subjectsName: subjectsName.articles,
  },
};

const Info = (props) => {
  const dispatch = useDispatch();
  const [isQuestionFound, setIsQuestionFound] = useState(true);
  const type = window.location.pathname.split('/')[1];

  const {
    getSubj, getComments, increaseViews, toggleUpvote, toggleDownvote, subjectsName,
  } = mapSubjToActions[type];

  const subjects = useSelector((store) => store[subjectsName]);
  const id = props.match.params.id || window.location.pathname.match(/\d+/g)[0];
  const subject = subjects[id];

  useEffect(() => {
    (async () => {
      const res = await dispatch(getSubj(id));
      if ((res instanceof Error)) {
        setIsQuestionFound(false);
      }
    })();
    dispatch(getUserLoginStatus());
    dispatch(getComments(id));
    dispatch(increaseViews(id));
  }, [dispatch, id]);

  if (!isQuestionFound) {
    return (
      <div className="text-center">
        <h1>Вопрос не найден</h1>
      </div>
    );
  }


  if (!subject) {
    return (
      <div className="text-center">
        <h1>Загрузка...</h1>
      </div>
    );
  }

  const onUpvoteClick = () => {
    dispatch(toggleUpvote(id));
    dispatch(getSubj(id));
  };

  const onDownvoteClick = () => {
    dispatch(toggleDownvote(id));
    dispatch(getSubj(id));
  };

  const {
    closed,
    only_experts_answer: onlyExpertsAnswer,
    only_chosen_tags: onlyChosenTags,
    // id,
    u_id: userId,
    email,
    title,
    body,
    creation_date: creationDate,
    score,
    view_count: viewCount,
    comment_count: commentCount,
    tags,
  } = subject;

  return (
    <div className="container">
      <div className="card mb-3 mt-3">
        <div className="card-header">
          {email}
        </div>
        <div className="card-body">
          <div className="form-group">
            <h2 className="card-title">{title}</h2>
            Рейтинг вопроса:
            {' '}
            {score}
            <div className="form-group">
              <button onClick={onUpvoteClick} type="button" className="btn btn-primary btn-sm">+</button>
              <button onClick={onDownvoteClick} type="button" className="btn btn-danger btn-sm">—</button>
            </div>
            <p className="card-text">
              {body}
            </p>
            <p>Прикрепленные файлы:</p>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <img
                  src={`${process.env.PUBLIC_URL}/androsheep1.jpg`}
                  className="img-fluid"
                  alt="androsheep"
                />
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <img
                  src={`${process.env.PUBLIC_URL}/androsheep2.jpg`}
                  className="img-fluid"
                  alt="androsheep"
                />
              </div>
            </div>

          </div>
        </div>
        <h6 className="text-muted text-left pl-3">{`Просмотры: ${viewCount}`}</h6>
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
      <CommentGroup.Comments />
      <CommentGroup.CreateComment subjectId={id} subjectType={type} />
    </div>
  );
};

export default Info;
