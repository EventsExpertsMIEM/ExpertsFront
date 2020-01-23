import React from 'react';
import {Link, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Auth = () => {
    let {path, url} = useRouteMatch();
    return (
        <div className="container">
            <div className="col-6 offset-3">
                <nav className="nav-pills nav-justified">
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <Link className="nav-item nav-link active"
                              to={`${url}/signup`} role="tab">Регистрация</Link>
                        <Link className="nav-item nav-link"
                              to={`${url}/sigin`}
                              role="tab" aria-controls="sigin"
                        >Вход</Link>
                    </div>
                </nav>
                <Switch>
                    <Route path={`${path}`} exact render={() => <Redirect to={`${path}/signup`} />} />
                    <Route path={`${path}/signup`} component={SignUp} />
                    <Route path={`${path}/sigin`} component={SignIn} />
                </Switch>
            </div>
        </div>
    )
};

export default Auth;
