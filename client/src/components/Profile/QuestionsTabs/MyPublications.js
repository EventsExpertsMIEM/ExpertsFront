/* eslint-disable react/jsx-props-no-spreading, no-shadow,react/prop-types,
 react/destructuring-assignment */
import React from 'react';
import Table from '../Table';

const MyPublications = (props) => {
  const {
    data, columns, showEdit, id, editComponent,
  } = props;
  return (
    <>
      <Table data={data} columns={columns} id={id} />
      <div className={showEdit ? 'd-block' : 'd-none'}>
        {editComponent()}
      </div>
    </>
  );
};

export default MyPublications;
