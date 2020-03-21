import React from 'react';
import {
  Link, Redirect, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from './SignUp';
import SignIn from './SignIn';

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
              to={`${url}/signup`}
              role="tab"
            >
              Регистрация
            </Link>
            <Link
              className="nav-item nav-link"
              to={`${url}/sigin`}
              role="tab"
              aria-controls="sigin"
            >
              Вход
            </Link>
          </div>
        </nav>
        <Switch>
          <Route path={`${path}`} exact render={() => <Redirect to={`${path}/signup`} />} />
          <Route path={`${path}/sigin`} component={SignIn} />
          <Route path={`${path}/signup`} exact>
            {signIn ? <Redirect to="/" /> : <SignUp />}
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
