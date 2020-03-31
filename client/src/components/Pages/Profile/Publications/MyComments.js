import React from 'react';
import { useSelector } from 'react-redux';
import Comments from '../../../CommentGroup/Comments';

const MyComments = () => {
  const comments = useSelector((store) => store.table.comments);

  return <Comments comments={comments} showPublicationId />;
};

export default MyComments;
