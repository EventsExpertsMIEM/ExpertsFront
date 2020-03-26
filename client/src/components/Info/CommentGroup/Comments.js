import React from 'react';
import { useSelector } from 'react-redux';
import Comment from './Comment';

const Comments = () => {
  const comments = useSelector((store) => store.comments);

  return (
    <>
      <h4>Комментарии</h4>
      <div className="media">
        <div className="media-body">
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {comments.map((comment) => <Comment {...comment} />)}
        </div>
      </div>
    </>
  );
};

export default Comments;
