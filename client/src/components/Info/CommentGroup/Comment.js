/* eslint-disable no-unused-vars, react/prop-types */
import React from 'react';
import { formatDetailedDateTime } from '../../helpers/helpers';

const Comment = (props) => {
  const {
    id, p_id, u_id, email, text, status, creation_date, score,
  } = props;

  return (
    <div key={id} className="media-body mt-3 mb-3">
      <h5 className="mt-0">{email}</h5>
      <img
        src={`${process.env.PUBLIC_URL}/androsheep2.jpg`}
        className="mr-3 rounded img-thumbnail img-fluid"
        style={{ width: '10%' }}
        alt="..."
      />
      {text}
      <div>
        <div>Дата создания:</div>
        <div>{formatDetailedDateTime(creation_date)}</div>
        <span>Апвоут:</span>
        <span>{score}</span>
      </div>
    </div>
  );
};

export default Comment;
