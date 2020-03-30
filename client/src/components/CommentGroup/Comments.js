/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import { resetComments } from '../../actions/uiActions';
import { mapSubjToActions } from '../../actions';

const Comments = ({ type }) => {
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.comments);
  const { getComments } = mapSubjToActions[type];

  useEffect(() => () => {
    dispatch(resetComments());
  }, [dispatch]);

  return (
    <>
      <h4>Комментарии</h4>
      <div className="media">
        <div className="media-body">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
              getComments={getComments}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
