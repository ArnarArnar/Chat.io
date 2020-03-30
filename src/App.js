import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import LogIn from './components/LogIn/LogIn/LogIn.js';
import Header from './components/Header/Header';
import Lobby from './components/Lobby/Lobby/Lobby';
import Room from './components/Room/Room/Room';
import NotFound from './components/NotFound';

import { store } from './index';
class App extends React.Component {
  render() {
    if (store.getState().user.user === '') {
      <Route render={() => <Redirect to="/" />} />;
    }
    return (
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <LogIn />} />
            <Route exact path="/login" render={() => <Redirect to="/" />} />
            <Route exact path="/lobby" render={() => <Lobby />} />
            <Route exact path="/room/:roomName" render={() => <Room />} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
