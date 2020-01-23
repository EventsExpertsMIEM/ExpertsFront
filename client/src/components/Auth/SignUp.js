import React from "react";

const SignUp = () => (
    <form id="signUp">
        <div className="tab-pane show active" id="nav-register" role="tabpanel"
             aria-labelledby="nav-register-tab">
            <div className="form-group">
                <input type="email" className="form-control" id="inputEmail2"
                       placeholder="Адрес электронной почты" form="signUp" required />
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id="inputPassword2" placeholder="Пароль"
                       form="signUp" minLength="6" required />
                <div className="help-block">Минимум 6 символов</div>
            </div>
            <div className="form-group">
                <input type="password" className="form-control" id="passwordConfirm"
                       placeholder="Подтверждение пароля" form="signUp" minLength="6" required />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="inputFIO" placeholder="ФИО" form="signUp" required />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="inputOrg" placeholder="Организация"
                       form="signUp" required />
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id="inputPos" placeholder="Должность"
                       form="signUp" required />
            </div>
            <div className="form-row text-center">
                <div className="col-12">
                    <input type="submit" className="btn btn-primary"
                           data-target="#successful_register_modal" value="Регистрация" />
                </div>
            </div>
        </div>
    </form>
)

export default SignUp;
