/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import {
  Link, Redirect, Route, useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileTabs from './ProfileTabs';
import QuestionsTabs from './QuestionsTabs';
import { getUserQuestions, ROLES } from '../../actions';
import requireAuth from '../requireAuth';

const getTabs = (params) => [
  {
    tabUrl: '',
    info: '',
    component: () => <Redirect to="profile/personal-info" />,
  },
  {
    tabUrl: 'personal-info',
    info: 'Персональная информация',
    component: ProfileTabs.PersonalInfo,
  },
  {
    tabUrl: 'security',
    info: 'Настройки безопасности',
    component: ProfileTabs.SecurityTab,
  },
  {
    tabUrl: 'personal-questions',
    info: 'Мои вопросы',
    badge: params.questions.length,
    component: QuestionsTabs.MyQuestions,
  },
  /*  {
      tabUrl: 'personal-subscriptions',
      info: 'Мои подписки',
      badge: 2,
      component: QuestionsTabs.Subscriptions,
    }, */
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

  const props = {
    user,
    questions,
  };

  const tabs = getTabs(props);

  useEffect(() => {
    if (user.id) {
      dispatch(getUserQuestions(user.id));
    }
  }, [dispatch, user.id]);

  const renderLinks = ({
    tabUrl, info, badge, renderCondition,
  }) => (
    checkCondition(renderCondition, props) && (
      <Link
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
