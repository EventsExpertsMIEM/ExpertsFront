import React from 'react';

const PersonalInfo = () => (
  <form id="personal-info">
    <div
      className="tab-pane fade show active text-center"
      id="personal-info-tab"
      role="tabpanel"
      aria-labelledby="nav-personal-tab"
    >
      <img
        alt="User Pic"
        src=""
        id="profile-image1"
        className="img-fluid rounded"
        style={{ width: '15rem' }}
      />
      <h4>Иванов Иван Иванович</h4>
      <p>+7 999 123-45-67</p>
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
        <div className="alert alert-success" role="alert">
          Данные о месте работы и должности сохранены
        </div>
      </div>
    </div>
  </form>
);

export default PersonalInfo;
