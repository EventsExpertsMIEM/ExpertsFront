import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Questions from './Pages/Questions';
import Auth from './Pages/Auth/Auth';
import NotFoundPage from './Pages/NotFondPage';
import Navigation from './Pages/Navigation';
import Publication from './Publications/Publication/Publication';
import CreateQuestion from './Publications/Question/CreateQuestion';
import Articles from './Pages/Articles';
import CreateArticle from './Publications/Article/CreateArticle';
import Profile from './Pages/Profile/Profile';

const routesMap = {
  main: {
    path: '/', requireAuth: null, component: Questions, exact: true,
  },
  info: { path: '/questions/:id', requireAuth: null, component: Publication },
  profile: { path: '/profile', requireAuth: true, component: Profile },
  createQuestion: { path: '/create-question', requireAuth: true, component: CreateQuestion },
  articles: {
    path: '/articles', requireAuth: true, component: Articles, exact: true,
  },
  article: { path: '/articles/:id', requireAuth: true, component: Publication },
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
