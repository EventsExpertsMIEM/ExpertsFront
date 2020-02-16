import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import Profile from './Profile/Profile';
import Auth from './Auth/Auth';
import NotFoundPage from './Pages/NotFondPage';
import Navigation from './Pages/Navigation';
import Info from './Info/Info';

const App = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/info" component={Info} />
      <Route path="/profile" component={Profile} />
      <Route path="/auth" component={Auth} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </Router>
);

export default App;
