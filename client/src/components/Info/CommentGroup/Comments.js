import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import { resetComments } from '../../../actions/uiActions';

const Comments = () => {
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.comments);

  useEffect(() => () => {
    dispatch(resetComments());
  }, [dispatch]);

  return (
    <>
      <h4>Комментарии</h4>
      <div className="media">
        <div className="media-body">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {comments.map((comment) => <Comment key={comment.id} {...comment} />)}
        </div>
      </div>
    </>
  );
};

export default Comments;
