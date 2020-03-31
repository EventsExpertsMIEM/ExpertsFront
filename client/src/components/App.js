import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import Auth from './Auth/Auth';
import NotFoundPage from './Pages/NotFondPage';
import Navigation from './Pages/Navigation';
import Question from './Question/Question';
import CreateQuestion from './Question/CreateQuestion';
import Articles from './Article/Articles';
import CreateArticle from './Article/CreateArticle';
import Profile from './Profile/Profile';

const routesMap = {
  main: {
    path: '/', requireAuth: null, component: MainPage, exact: true,
  },
  info: { path: '/questions/:id', requireAuth: null, component: Question },
  profile: { path: '/profile', requireAuth: true, component: Profile },
  createQuestion: { path: '/create-question', requireAuth: true, component: CreateQuestion },
  articles: {
    path: '/articles', requireAuth: true, component: Articles, exact: true,
  },
  article: { path: '/articles/:id', requireAuth: true, component: Question },
  createArticle: { path: '/create-article', requireAuth: true, component: CreateArticle },
  auth: { path: '/auth', requireAuth: false, component: Auth },
  notFoundPage: { path: '*', requireAuth: false, component: NotFoundPage },
};

const App = () => (
  <Router>
    <Navigation />
    <Switch>
      {Object.values(routesMap).map(({
        path, component, exact,
      }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          component={component}
        />
      ))}
    </Switch>
  </Router>
);

export default App;
