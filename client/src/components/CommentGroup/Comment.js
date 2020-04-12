/* eslint-disable no-unused-vars, react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDetailedDateTime } from '../../helpers/helpers';
import { getAvatar, toggleCommentDownvote, toggleCommentUpvote } from '../../actions';
import { DEFAULT_AVATAR } from '../../helpers/consts';

const Comment = (props) => {
  const dispatch = useDispatch();
  const avatar = useSelector((store) => store.avatar);
  const {
    id,
    u_id,
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

  const user = useSelector((store) => store.user);

  useEffect(() => {
    (async () => {
      await dispatch(getAvatar(u_id));
    })();
  }, [dispatch, u_id]);

  return (
    <div key={id} className="media-body mt-3 mb-3 row">
      <div className="row rounded img-thumbnail w-100">
        <div className="col-lg-2">
          {!showPublicationId && (
            <>
              <h5 className="mt-0">{email}</h5>
              <img
                src={avatar[u_id] || DEFAULT_AVATAR}
                className="mr-3 rounded img-thumbnail img-fluid"
                alt="avatar"
              />
            </>
          )}
          <div>
            {showPublicationId
            && <div className="text-left"><Link to={`/${post_type}s/${p_id}`}>{`${post_type} #${p_id}`}</Link></div>}
            <div />
            <div>Дата создания:</div>
            <div>{formatDetailedDateTime(creation_date)}</div>
            {getComments
            && (
              <>
                <span>Рейтинг:</span>
                  {' '}
                <span>{score}</span>
                  {user.isLoggedIn && (
                  <div className="form-group">
                    <button onClick={onUpvoteClick} type="button" className="btn btn-primary btn-sm">
                      +
                    </button>
                    <button onClick={onDownvoteClick} type="button" className="btn btn-danger btn-sm">
                      —
                    </button>
                  </div>
                  )}
              </>
            )}
          </div>
        </div>
        <div className="col-lg-10 mt-4">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
