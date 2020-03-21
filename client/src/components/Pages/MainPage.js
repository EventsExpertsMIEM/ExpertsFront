import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, getQuestions, question } from '../../actions';

const MainPage = () => {
  // eslint-disable-next-line no-unused-vars
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const onClick = () => dispatch(getQuestions());

  useEffect(() => {
    dispatch(login());
    setTimeout(() => dispatch(question()), 1000);
  }, [dispatch]);

  return (
    <div className="container">
      {Array.from({ length: 3 }).map(() => (
        <div className="card mb-3 mt-3" key={Math.random()}>
          <div className="card-body">
            <h5 className="card-title">Снятся ли андроидам электроовцы?</h5>
            <p className="card-text">
              Дорогие коллеги, нужна консультация по малоисследованному, но в данный
              момент
              актуальному в моей дефтельности вопросу.
            </p>
            <Link to="/info" className="card-link btn btn-outline-primary">Подробности</Link>
          </div>
          <div className="card-footer">
            <div className="row">

              <div className="col-lg-10 col-md-10 col-sm-10 text-center">
                <Link to="/" href="/" className="badge badge-primary">Робототехника</Link>
                <Link to="/" href="/" className="badge badge-primary">Программирование МК</Link>
                <Link to="/" href="/" className="badge badge-primary">Искуственный интеллект</Link>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 text-muted text-center">
                1 день назад
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-dark"
        onClick={onClick}
      >
        Загрузить еще
      </button>
    </div>
  );
};

export default MainPage;
