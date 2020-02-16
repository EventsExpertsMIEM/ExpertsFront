import React from 'react';
import {
  Link, Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import PersonalInfo from './PerosnalInfo';
import SecurityTab from './SecurityTab';
import Events from './Experts';

const Profile = () => {
  const { path, url } = useRouteMatch();
  return (
    <div className="container">
      <div className="row d-flex flex-wrap align-items-center">
        <div className="col-lg-4">
          <img
            alt="User Pic"
            src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
            id="profile-image1"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-lg-8">
          <h4>Иванов Иван Иванович</h4>
          <p className="font-weight-bold">МИЭМ НИУ ВШЭ</p>
          <p className="font-italic">Старший научный сотрудник</p>
        </div>
      </div>
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

export default Profile;
