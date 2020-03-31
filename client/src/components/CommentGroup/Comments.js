/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Comment from './Comment';
import { resetComments } from '../../actions';

const Comments = ({ getComments, comments, showPublicationId }) => {
  const dispatch = useDispatch();

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
              showPublicationId={showPublicationId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
