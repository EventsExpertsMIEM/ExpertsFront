/* eslint-disable react/jsx-props-no-spreading, react/prop-types */
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import {
  deleteComment, getUserComments, resetComments, updateComment,
} from '../../actions';

const Comments = ({ getComments, comments, showPublicationId }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const onDeleteComment = async (id) => {
    await dispatch(deleteComment(id));
    await dispatch(getUserComments(user.id));
  };
    // eslint-disable-next-line consistent-return
  const onUpdateComment = async (id) => {
    const text = prompt('Введите новый комментарий');
    const formattedText = text && text.trim();
    if (!formattedText) {
      return null;
    }
    await dispatch(updateComment(id, formattedText));
    await dispatch(getUserComments(user.id));
  };

  useEffect(() => () => {
    dispatch(resetComments());
  }, [dispatch]);

  return (
    <>
      <h4 className="mt-4 mb-2">Комментарии</h4>
      <div className="media">
        <div className="media-body">
          {comments.slice(0).reverse().map((comment) => (
            <Fragment key={comment.id}>
              <Comment
                {...comment}
                getComments={getComments}
                showPublicationId={showPublicationId}
              />
              {showPublicationId && (
                <>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-info mr-2 mb-3"
                    onClick={() => onUpdateComment(comment.id)}
                  >
                    Изменить комментарий
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger mb-3"
                    onClick={() => onDeleteComment(comment.id)}
                  >
                    Удалить комментарий
                  </button>
                  <hr />
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
