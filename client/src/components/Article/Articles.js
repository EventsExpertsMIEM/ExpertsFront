/* eslint-disable jsx-a11y/label-has-associated-control,
 react/prop-types, react/destructuring-assignment */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import requireAuth from '../requireAuth';
import Table from '../Profile/Table';
import { formatDateTime } from '../helpers/helpers';
import { getAllArticles } from '../../actions';

const Articles = () => {
  const dispatch = useDispatch();
  const articles = useSelector((store) => store.articles);
  const [query, setQuery] = useState('');

  const handleChange = (e) => setQuery(e.target.value.trim().toLowerCase());

  useEffect(() => {
    dispatch(getAllArticles());
  }, [dispatch]);

  const columns = [
    {
      Header: 'Каталог всех статей',
      columns: [
        {
          Header: 'Название',
          accessor: 'name',
          Cell: (props) => {
            const { title, id } = props.row.original;
            return (
              <Link to={`/articles/${id}`} className="text-center">{title}</Link>
            );
          },
        },
        {
          Header: 'Автор',
          accessor: 'email',
          Cell: (props) => {
            const { email } = props.row.original;
            return <h6 className="text-center">{email}</h6>;
          },
        },
        {
          Header: 'Дата публикации',
          accessor: 'data',
          Cell: (props) => {
            const { creation_date } = props.row.original;
            return (<div>{formatDateTime(creation_date)}</div>);
          },
        },
        {
          Header: 'Научные области',
          accessor: 'tags',
          Cell: (props) => {
            const { tags } = props.row.original;
            return tags.map((tag) => <div className="badge badge-primary" key={tag}>{tag}</div>);
          },
        },
      ],
    },
  ];

  return (
    <div className="container">
      <input
        className="form-control"
        type="search"
        placeholder="Поиск по названиям статей"
        aria-label="Search"
        onChange={handleChange}
      />
      <Table
        data={Object.values(articles)
          .filter((article) => article.title.toLowerCase().indexOf(query) > -1)}
        columns={columns}
      />
    </div>
  );
};

export default requireAuth(Articles);
