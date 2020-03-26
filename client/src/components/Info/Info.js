/* eslint-disable react/prop-types, react/destructuring-assignment, no-unused-vars, no-shadow */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { getAllQuestions, getQuestionComments, getUserLoginStatus } from '../../actions';
import { formatDetailedDateTime, renderInputField, renderTextareaField } from '../helpers/helpers';
import CommentGroup from './CommentGroup/index';

const Info = (props) => {
  const questions = useSelector((store) => store.questions);
  const dispatch = useDispatch();
  // eslint-disable-next-line react/destructuring-assignment
  const question = props.location
    && props.location.state
    ? props.location.state : questions[props.match.params.id];

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

  useEffect(() => {
    dispatch(getUserLoginStatus());
    dispatch(getAllQuestions());
    dispatch(getQuestionComments(id));
  }, []);

  return (
    <div className="container">
      <div className="card mb-3 mt-3">
        <div className="card-header">
          {email}
        </div>
        <div className="card-body">
          <div className="form-group">
            <h2 className="card-title">{title}</h2>
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
              <Link to="/" href="/" className="badge badge-primary">Робототехника</Link>
              <Link to="/" href="/" className="badge badge-primary">Программирование МК</Link>
              <Link to="/" href="/" className="badge badge-primary">Искуственный интеллект</Link>
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
