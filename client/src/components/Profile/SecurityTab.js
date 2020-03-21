import React from 'react';

const SecurityTab = () => (
  <form id="security">
    <div className="tab-pane show active mt-3" id="security" role="tabpanel" aria-labelledby="nav-security">
      <h4>Смена пароля</h4>
      <div className="form-group">
        <input
          className="form-control"
          name="password"
          type="password"
          placeholder="Текущий пароль"
          form="security"
          minLength="6"
          required
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          name="newPassword"
          type="password"
          placeholder="Новый пароль"
          form="security"
          minLength="6"
          required
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          name="newPassword"
          type="password"
          placeholder="Новый пароль еще раз"
          form="security"
          minLength="6"
          required
        />
      </div>
      <div className="form-group text-center">
        <input type="submit" className="btn btn-seconadary" value="Сохранить" />
        <div className="alert alert-success mt-2" role="alert">
          Новый пароль сохранен
        </div>
      </div>
    </div>
  </form>
);

export default SecurityTab;
