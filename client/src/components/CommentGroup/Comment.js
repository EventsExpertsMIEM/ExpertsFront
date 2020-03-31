/* eslint-disable no-unused-vars, react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDetailedDateTime } from '../../helpers/helpers';
import { toggleCommentDownvote, toggleCommentUpvote } from '../../actions';

const Comment = (props) => {
  const dispatch = useDispatch();
  const {
    id,
    p_id,
    email,
    text,
    creation_date,
    score,
    post_type,
    getComments,
    showPublicationId,
  } = props;

  const onUpvoteClick = () => {
    dispatch(toggleCommentUpvote(id));
    dispatch(getComments(p_id));
  };

  const onDownvoteClick = () => {
    dispatch(toggleCommentDownvote(id));
    dispatch(getComments(p_id));
  };

  return (
    <div key={id} className="media-body mt-3 mb-3">
      {showPublicationId
            && <div className="text-left"><Link to={`/${post_type}s/${p_id}`}>{`${post_type} #${p_id}`}</Link></div>}
      {!showPublicationId && (
        <>
          <h5 className="mt-0">{email}</h5>
          <img
            src={`${process.env.PUBLIC_URL}/androsheep2.jpg`}
            className="mr-3 rounded img-thumbnail img-fluid"
            style={{ width: '10%' }}
            alt="..."
          />
        </>
      )}
      <span className="text-center">{text}</span>
      <div>
        <div>Дата создания:</div>
        <div>{formatDetailedDateTime(creation_date)}</div>
        {getComments
                && (
                  <>
                    <span>Апвоут:</span>
                    {' '}
                    <span>{score}</span>
                    <div className="form-group">
                      <button onClick={onUpvoteClick} type="button" className="btn btn-primary btn-sm">+</button>
                      <button onClick={onDownvoteClick} type="button" className="btn btn-danger btn-sm">—</button>
                    </div>
                  </>
                )}
      </div>
    </div>
  );
};

export default Comment;
