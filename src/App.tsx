import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.global.css';
import Home from './components/home';
import PatientForm from './components/patient-form';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/patient-form" component={PatientForm} />
        </Switch>
      </Router>
    </Provider>
  );
}
