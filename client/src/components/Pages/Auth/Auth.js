import React from 'react';
import {
  Link, Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from './Register';
import SignIn from './Login';

const Auth = () => {
  const { path, url } = useRouteMatch();
  const signIn = useSelector((store) => store.user.signIn);

  return (
    <div className="container">
      <div className="col-6 offset-3">
        <nav className="nav-pills nav-justified">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <Link
              className="nav-item nav-link"
              to={`${url}/register`}
              role="tab"
              aria-controls="register"
            >
              Регистрация
            </Link>
            <Link
              className="nav-item nav-link"
              to={`${url}/login`}
              role="tab"
              aria-controls="login"
            >
              Вход
            </Link>
          </div>
        </nav>
        <Switch>
          <Route path={path} exact render={() => <Redirect to={`${path}/register`} />} />
          <Route path={`${path}/login`} component={SignIn} />
          <Route path={`${path}/register`} exact>
            {signIn ? <Redirect to="/" /> : <SignUp />}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
