/* eslint-disable react/prop-types, react/destructuring-assignment, no-unused-vars, no-shadow */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLoginStatus, mapSubjToActions } from '../../../actions';
import { formatDetailedDateTime } from '../../../helpers/helpers';
import CommentGroup from '../../CommentGroup';

const Publication = (props) => {
  const dispatch = useDispatch();
  const [isQuestionFound, setIsQuestionFound] = useState(true);
  const type = window.location.pathname.split('/')[1];

  const {
    getSubj, getComments, increaseViews, toggleUpvote, toggleDownvote, subjectsName,
  } = mapSubjToActions[type];

  const subjects = useSelector((store) => store[subjectsName]);
  const comments = useSelector((store) => store.comments);
  const user = useSelector((store) => store.user);
  const id = props.match.params.id || window.location.pathname.match(/\d+/g)[0];
  const subject = subjects[id];

  const tagsString = subject && subject.tags.join();

  useEffect(() => {
    (async () => {
      const res = await dispatch(getSubj(id));
      if ((res instanceof Error)) {
        setIsQuestionFound(false);
      }
      await dispatch(getUserLoginStatus());
      await dispatch(getComments(id));
    })();
  }, [dispatch, getSubj, getComments, increaseViews, id, tagsString]);

  useEffect(() => {
    (async () => {
      await dispatch(increaseViews(id));
    })();
  }, [dispatch, increaseViews, id]);

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
    email,
    title,
    body,
    creation_date: creationDate,
    score,
    view_count: viewCount,
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
            {user.isLoggedIn
            && (
            <div className="form-group">
              <button onClick={onUpvoteClick} type="button" className="btn btn-primary btn-sm">
                +
              </button>
              <button onClick={onDownvoteClick} type="button" className="btn btn-danger btn-sm">
                —
              </button>
            </div>
            )}
            <p className="card-text">
              {body}
            </p>
          </div>
        </div>
        <h6 className="text-muted text-left pl-3">{`Просмотры: ${viewCount}`}</h6>
        <div className="card-footer">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-8 text-center">
              {tags.map((tag) => <Link key={tag} to="/" className="badge badge-primary">{tag}</Link>)}
            </div>
            <div className="col-lg-4 col-md-4 col-sm-4 text-muted text-center">
              {formatDetailedDateTime(creationDate)}
            </div>
          </div>
        </div>
      </div>
      <CommentGroup.Comments getComments={getComments} comments={comments} />
      {user.isLoggedIn && <CommentGroup.CreateComment subjectId={id} subjectType={type} />}
    </div>
  );
};

export default Publication;
