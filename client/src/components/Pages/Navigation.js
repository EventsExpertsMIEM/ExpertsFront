/* eslint-disable react/jsx-props-no-spreading, consistent-return, array-callback-return */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../actions';

const Navigation = () => {
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const dispatch = useDispatch();
  const onClick = () => dispatch(logout());

  const POSITION = {
    LEFT: 'mr-1',
    RIGHT: 'ml-1',
    RIGHT2: 'ml-auto',
  };

  const map = {
    main: {
      path: '/', name: 'Главная', requireAuth: null, position: POSITION.LEFT,
    },
    profile: {
      path: '/profile', name: 'Личный кабинет', requireAuth: true, position: POSITION.LEFT,
    },
    articles: {
      path: '/articles', name: 'Статьи', requireAuth: true, position: POSITION.LEFT,
    },
    createQuestion: {
      path: '/create-question', name: 'Создать вопрос', requireAuth: true, position: POSITION.LEFT,
    },
    createArticle: {
      path: '/create-article', name: 'Создать статью', requireAuth: true, position: POSITION.LEFT,
    },
    login: {
      path: '/auth/login', name: 'Вход', requireAuth: false, position: POSITION.RIGHT2,
    },
    logout: {
      path: '/', name: 'Выход', requireAuth: true, position: POSITION.RIGHT2, onClick,
    },
    register: {
      path: '/auth/register', name: 'Регистрация', requireAuth: false, position: POSITION.RIGHT,
    },
  };

  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg">
      {Object.values(map).map(({
        path, position, name, requireAuth, ...props
      }) => {
        if (requireAuth !== null && requireAuth !== isLoggedIn) {
          return;
        }
        return (
          <Link
            key={name}
            to={path}
            className={`nav-link ${position}`}
            {...props}
          >
            {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
