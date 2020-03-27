/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import requireAuth from '../requireAuth';

const Articles = () => (
  <div className="container">
    <h3>Каталог всех статей</h3>
    <h4>Последние опубликованные статьи:</h4>
    <ul>
      <li>Название статьи 1</li>
      <li>Название статьи 2</li>
      <li>Название статьи 3</li>
    </ul>
    <form className="form-group">
      <div className="row">
        <div className="col-9">
          <input
            className="form-control"
            type="search"
            placeholder="Поиск по названиям статей"
            aria-label="Search"
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Название</th>
                <th scope="col">Автор</th>
                <th scope="col">Дата публикации</th>
                <th scope="col">Научные области</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Link to="/">Название 1</Link></td>
                <td>Иванов И.И.</td>
                <td>02.03.2020</td>
                <td>
                  <Link to="/" className="badge badge-primary">Робототехника</Link>
                  <Link to="/" className="badge badge-primary">Программирование МК</Link>
                  <Link to="/" className="badge badge-primary">Искуственный интеллект</Link>
                </td>
              </tr>
              <tr>
                <td>Название 2</td>
                <td>Иванов И.И.</td>
                <td>17.03.2020</td>
                <td>
                  <Link to="/" className="badge badge-primary">Робототехника</Link>
                  <Link to="/" className="badge badge-primary">Программирование МК</Link>
                  <Link to="/" className="badge badge-primary">Искуственный интеллект</Link>
                </td>
              </tr>
              <tr>
                <td>Название 3</td>
                <td>Иванов И.И.</td>
                <td>24.03.2020</td>
                <td>
                  <Link to="/" className="badge badge-primary">Робототехника</Link>
                  <Link to="/" className="badge badge-primary">Программирование МК</Link>
                  <Link to="/" className="badge badge-primary">Искуственный интеллект</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-3">
          <button className="btn btn-outline-primary" type="submit">Искать</button>
          <div className="form-check mt-2">
            <input className="form-check-input" type="checkbox" id="tagCheck1" />
            <label className="form-check-label" htmlFor="tagCheck1">
              Программирование МК
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="tagCheck1" />
            <label className="form-check-label" htmlFor="tagCheck2">
              Робототехника
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="tagCheck1" />
            <label className="form-check-label" htmlFor="tagCheck3">
              Физика
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="tagCheck1" />
            <label className="form-check-label" htmlFor="tagCheck4">
              Химия
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="tagCheck1" />
            <label className="form-check-label" htmlFor="tagCheck5">
              И так далее
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
);

export default requireAuth(Articles);
