import React from 'react';
import {
  Link, Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import PersonalInfo from './PerosnalInfo';
import SecurityTab from './SecurityTab';
import Events from './Experts';
import requireAuth from '../requireAuth';
import MyQuestions from './MyQuestions';
import Subscriptions from './Subscriptions';

const Profile = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <nav className="nav flex-column">
            <Link
              className="nav-link active"
              id="nav-personal-tab"
              to={`${url}/personal-info-tab`}
              role="tab"
              aria-controls="personal-info-tab"
            >
              Персональная информация
            </Link>
            <Link
              className="nav-link"
              id="nav-security-tab"
              to={`${url}/security-tab`}
              role="tab"
              aria-controls="security-tab"
            >
              Настройки безопасности
            </Link>
            <Link
              className="nav-link"
              id="nav-security-tab"
              to={`${url}/create-question`}
              role="tab"
              aria-controls="security-tab"
            >
              Создать вопрос
            </Link>
            <Link
              className="nav-link"
              id="my-questions-tab"
              to={`${url}/my-questions-tab`}
              role="tab"
              aria-controls="security-tab"
            >
              Мои вопросы
              <span className="badge badge-light">2</span>
            </Link>
            <Link
              className="nav-link"
              id="my-questions-tab"
              to={`${url}/subscriptions`}
              role="tab"
              aria-controls="security-tab"
            >
              Мои подписки
              <span className="badge badge-light">3</span>
            </Link>
          </nav>
        </div>
        <div className="col-lg-8">
          <div className="tab-content" id="nav-tabContent">

            <Switch>
              <Route
                path={`${path}`}
                exact
                render={() => <Redirect to={`${path}/personal-info-tab`} />}
              />
              <Route path={`${path}/personal-info-tab`} component={PersonalInfo} />
              <Route path={`${path}/security-tab`} component={SecurityTab} />
              <Route path={`${path}/create-question`} component={Events} />
              <Route path={`${path}/my-questions-tab`} component={MyQuestions} />
              <Route path={`${path}/subscriptions`} component={Subscriptions} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default requireAuth(Profile);
