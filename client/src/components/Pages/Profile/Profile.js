/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  Link, Redirect, Route, useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from 'redux-form';
import ProfileTabs from './Management';
import QuestionsTabs from './Publications';
import {
  getUserArticles, getUserComments, getUserQuestions, ROLES,
} from '../../../actions';
import requireAuth from '../../HOCs/requireAuth';
import { FIELD_NAMES } from '../../../helpers/consts';

const getTabs = ({
  dispatch, currentUserData, questions, articles, comments,
}) => [
  {
    tabUrl: '',
    info: '',
    component: () => <Redirect to="profile/personal-info" />,
  },
  {
    tabUrl: 'personal-info',
    info: 'Персональная информация',
    component: ProfileTabs.ProfileData,
  },
  {
    tabUrl: 'security',
    info: 'Настройки безопасности',
    component: ProfileTabs.SecurityTab,
  },
  {
    tabUrl: 'personal-questions',
    info: 'Мои вопросы',
    badge: questions.length,
    component: QuestionsTabs.MyQuestions,
  },
  {
    tabUrl: 'personal-articles',
    info: 'Мои статьи',
    badge: articles.length,
    component: QuestionsTabs.MyArticles,
  },
  {
    tabUrl: 'personal-comments',
    info: 'Мои комментарии',
    badge: comments.length,
    component: QuestionsTabs.MyComments,
  },
  {
    tabUrl: 'edit-personal-data',
    info: 'Редактировать профиль',
    component: ProfileTabs.EditProfileData,
    onClick: () => dispatch(initialize(FIELD_NAMES.PROFILE, currentUserData)),
  },
  {
    tabUrl: 'admin-panel',
    info: 'Панель администратора',
    component: ProfileTabs.AdminPanel,
    renderCondition: (props) => {
      const { role } = props.user;
      return role === ROLES.SUPERADMIN || role === ROLES.ADMIN;
    },
  },
];

const checkCondition = (condition, props) => ((!condition || (typeof condition === 'function' && condition(props))));

const Profile = () => {
  const dispatch = useDispatch();
  const { path, url } = useRouteMatch();
  const user = useSelector((state) => state.user);

  const questions = useSelector((store) => store.table.questions);
  const articles = useSelector((store) => store.table.articles);
  const comments = useSelector((store) => store.table.comments);

  const currentUserData = {
    name: user.name,
    surname: user.surname,
    position: user.position,
  };

  const props = {
    user,
  };

  const tabs = getTabs({
    dispatch, currentUserData, questions, articles, comments,
  });

  useEffect(() => {
    if (user.id) {
      dispatch(getUserQuestions(user.id));
      dispatch(getUserArticles(user.id));
      dispatch(getUserComments(user.id));
    }
  }, [dispatch, user.id]);

  const renderLinks = ({
    tabUrl, info, badge, renderCondition, onClick,
  }) => (
    checkCondition(renderCondition, props) && (
    <Link
      onClick={onClick}
      key={tabUrl}
      className="nav-link active"
      role="tab"
      to={`${url}/${tabUrl}`}
    >
      {info}
      {!!badge && <span className="badge badge-light">{badge}</span>}
    </Link>
    )
  );

  const renderRoutes = ({ tabUrl, component, renderCondition }) => (
    checkCondition(renderCondition, props) && (
    <Route
      key={tabUrl}
      exact
      path={`${path}/${tabUrl}`}
      component={typeof component === 'function' ? () => component(props) : component}
    />
    )
  );

  if (!user.role) {
    return (
      <div className="text-center">
        <h1>Загрузка...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <nav className="nav flex-column">
            {tabs.map(renderLinks)}
          </nav>
        </div>
        <div className="col-lg-8">
          <div className="tab-content" id="nav-tabContent">
            {tabs.map(renderRoutes)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default requireAuth(Profile);
