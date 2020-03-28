import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainPage from './Pages/MainPage';
import Profile from './Profile/Profile';
import Auth from './Auth/Auth';
import NotFoundPage from './Pages/NotFondPage';
import Navigation from './Pages/Navigation';
import Info from './Info/Info';
import CreateQuestion from './Question/CreateQuestion';
import Articles from './Article/Articles';
import CreateArticle from './Article/CreateArticle';

const routesMap = {
  main: {
    path: '/', requireAuth: null, component: MainPage, exact: true,
  },
  info: { path: '/questions/:id', requireAuth: null, component: Info },
  profile: { path: '/profile', requireAuth: true, component: Profile },
  createQuestion: { path: '/create-question', requireAuth: true, component: CreateQuestion },
  articles: {
    path: '/articles', requireAuth: true, component: Articles, exact: true,
  },
  article: { path: '/articles/:id', requireAuth: true, component: Info },
  createArticle: { path: '/create-article', requireAuth: true, component: CreateArticle },
  auth: { path: '/auth', requireAuth: false, component: Auth },
  notFoundPage: { path: '*', requireAuth: false, component: NotFoundPage },
};

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  return (
    <Router>
      <Navigation />
      <Switch>
        {Object.values(routesMap).map(({
          // eslint-disable-next-line no-unused-vars
          path, component, exact, requireAuth,
        }) => (
          /* (requireAuth === null || requireAuth === isLoggedIn) && */ (
            <Route
              key={path}
              path={path}
              exact={exact}
              component={component}
            />
          )
        ))}
      </Switch>
    </Router>
  );
};

export default App;
