import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { Main } from './components';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

export default App;
