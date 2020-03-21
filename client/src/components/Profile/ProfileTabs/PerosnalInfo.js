import React from 'react';

const PersonalInfo = (props) => {
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const { name, surname, email } = props.user;
  return (
    <form id="personal-info">
      <div
        className="tab-pane fade show active text-center mt-3"
        id="personal-info-tab"
        role="tabpanel"
        aria-labelledby="nav-personal-tab"
      >
        <img
          alt="User Pic"
          src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
          id="profile-image1"
          className="img-fluid rounded"
          style={{ width: '15rem' }}
        />
        <h4>
          {name}
          {' '}
          {surname}
        </h4>
        <p>+7 999 123-45-67</p>
        <p>{email}</p>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="userOrg"
            placeholder="МФТИ"
            form="personal-info"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="userPos"
            placeholder="Старший научный сотрудник"
            form="personal-info"
            required
          />
        </div>
        <div className="form-group text-center">
          <button type="submit" className="btn btn-seconadary">Сохранить</button>
          <div className="alert alert-success mt-2" role="alert">
            Данные о месте работы и должности сохранены
          </div>
        </div>
      </div>
    </form>
  );
};

export default PersonalInfo;
