import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import Profile from './Profile/Profile';
import Auth from './Auth/Auth';
import NotFoundPage from './Pages/NotFondPage';
import Navigation from './Pages/Navigation';
import Info from './Info/Info';
import CreateQuestion from './Question/CreateQuestion';
import Articles from './Article/Articles';
import CreateArticle from './Article/CreateArticle';

const App = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/info/:id" component={Info} />
      <Route path="/profile" component={Profile} />
      <Route path="/create-question" component={CreateQuestion} />
      <Route path="/articles" component={Articles} />
      <Route path="/create-article" component={CreateArticle} />
      <Route path="/auth" component={Auth} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
