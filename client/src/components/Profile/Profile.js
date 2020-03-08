import React from 'react';
import {
  Link, Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import PersonalInfo from './PerosnalInfo';
import SecurityTab from './SecurityTab';
import Events from './Experts';
import requireAuth from "../requireAuth";

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
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default requireAuth(Profile);
