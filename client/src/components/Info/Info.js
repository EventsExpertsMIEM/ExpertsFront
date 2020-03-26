/* eslint-disable react/prop-types, react/destructuring-assignment, no-unused-vars, no-shadow */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getQuestionComments, getUserLoginStatus, toggleDownvote, toggleUpvote, getQuestion,
} from '../../actions';
import { formatDetailedDateTime, renderInputField, renderTextareaField } from '../helpers/helpers';
import CommentGroup from './CommentGroup/index';

const Info = (props) => {
  const questions = useSelector((store) => store.questions);
  const dispatch = useDispatch();
  // eslint-disable-next-line react/destructuring-assignment
  const id = props.match.params.id || window.location.pathname.match(/\d+/g)[0];

  useEffect(() => {
    dispatch(getQuestion(id));
    dispatch(getUserLoginStatus());
    dispatch(getQuestionComments(id));
  }, []);

  const question = questions[id];

  if (!question) {
    return (
      <div className="text-center">
        <h1>Загрузка...</h1>
      </div>
    );
  }

  const onUpvoteClick = () => {
    dispatch(toggleUpvote(id));
    dispatch(getQuestion(id));
  };

  const onDownvoteClick = () => {
    dispatch(toggleDownvote(id));
    dispatch(getQuestion(id));
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
  } = question;

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
      <CommentGroup.CreateComment questionId={id} />
    </div>
  );
};

export default Info;
