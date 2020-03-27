import React, { useEffect } from 'react';
import {
  Link, Redirect, Route, useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileTabs from './ProfileTabs';
import QuestionsTabs from './QuestionsTabs';
import { getUserInfo } from '../../actions';
import requireAuth from '../requireAuth';

const getTabs = () => [
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
    badge: 3,
    component: QuestionsTabs.MyQuestions,
  },
  {
    tabUrl: 'personal-subscriptions',
    info: 'Мои подписки',
    badge: 2,
    component: QuestionsTabs.Subscriptions,
  }];

const Profile = () => {
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const props = {
    user,
  };

  useEffect(() => {
    dispatch(getUserInfo(user.id));
  }, [dispatch, user.id]);

  const tabs = getTabs();

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <nav className="nav flex-column">
            {tabs.map(({ tabUrl, info, badge }) => (
              <Link
                key={tabUrl}
                className="nav-link active"
                role="tab"
                to={`${url}/${tabUrl}`}
              >
                {info}
                {badge && <span className="badge badge-light">{badge}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="col-lg-8">
          <div className="tab-content" id="nav-tabContent">
            {tabs.map(({ tabUrl, component }) => (
              <Route
                key={tabUrl}
                exact
                path={`${path}/${tabUrl}`}
                component={typeof component === 'function' ? () => component(props) : component}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default requireAuth(Profile);
