import React from "react";

const SignIn = () => (
    <form id="signIn">
        <div className="tab-pane show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
            <div className="form-group">
                <input type="email" className="form-control" id="inputEmail1"
                       placeholder="Адрес электронной почты"
                       form="signIn"
                       required
                />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id="inputPassword1" placeholder="Пароль"
                       form="signIn"
                       required
                />
            </div>
            <div className="form-row text-center">
                <div className="col-12">
                    <input type="submit" className="btn btn-primary" value="Вход" />
                    <div className="alert alert-danger" role="alert" style={{"display": "none"}}>
                        Неверное имя пользователя или пароль
                    </div>
                </div>
            </div>
        </div>
    </form>
);

export default SignIn;
