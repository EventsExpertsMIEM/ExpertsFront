import React from 'react';
import { Link } from 'react-router-dom';

const Subscriptions = () => (
  <div
    className="tab-pane mt-3 active show"
    id="my-subscriptions-tab"
    role="tabpanel"
    aria-labelledby="nav-my-subscriptions-tab"
  >
    <h4>Новые вопросы по интересующим вас темам:</h4>
    <ul className="list-group">
      <li className="list-group-item">
        <Link to="/">Программирование МК </Link>
        <span
          className="badge badge-light"
        >
          1
        </span>
      </li>
      <li className="list-group-item">
        <Link to="/">Робототехника </Link>
        <span className="badge badge-light">2</span>
      </li>
      <li className="list-group-item">
        <Link to="/">Искуственный интеллект</Link>
      </li>
    </ul>
    <form>
      <div className="form-group text-center">
        <button type="button" className="btn btn-primary mt-2">Подписаться на другие темы</button>
      </div>
    </form>
  </div>
);

export default Subscriptions;
