import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';

const Navigation = () => {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const dispatch = useDispatch();
  const onClick = () => dispatch(logout());

  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg">
      <div className="navbar-nav mr-auto">
        <Link to="/" className="nav-link">Главная</Link>
        <Link to="/profile" className="nav-link">Личный кабинет</Link>
        <Link to="/articles" className="nav-link">Статьи</Link>
        <Link to="/create-question" className="nav-link">Создать вопрос</Link>
        <Link to="/create-article" className="nav-link">Создать статью</Link>
      </div>
      <div className="navbar-nav ml-auto">
        {isLoggedIn === true
          ? <Link to="/" className="nav-link" onClick={onClick}>Выход</Link>
          : <Link to="/auth/login" className="nav-link">Вход</Link>}
        <Link to="/auth/register" className="nav-link">Регистрация</Link>
      </div>
    </nav>
  );
};

export default Navigation;
