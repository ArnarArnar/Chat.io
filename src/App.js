import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';

import LogIn from './components/LogIn/LogIn/LogIn.js';
import Header from './components/Header/Header';
import Lobby from './components/Lobby/Lobby/Lobby';
import Room from './components/Room/Room/Room';
import PrivateChat from './components/PrivateChat/PrivateChatContainer/PrivateChat';
import NotFound from './components/NotFound';

//import { store } from './index';
class App extends React.Component {
  render() {
    const user = this.props.user;
    if (user === '') {
      <Route render={() => <Redirect to="/" />} />;
    }
    return (
      <div>
        <Header />
        <br />
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => <LogIn />} />
            <Route exact path="/login" render={() => <Redirect to="/" />} />
            <Route exact path="/lobby" render={() => <Lobby />} />
            <Route exact path="/room/:roomName" render={() => <Room />} />
            <Route exact path="/private/" render={() => <PrivateChat />} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.string,
};

const mapStateToProps = (reduxStoreState) => {
  return {
    user: reduxStoreState.user.user,
  };
};

export default connect(mapStateToProps)(App);
