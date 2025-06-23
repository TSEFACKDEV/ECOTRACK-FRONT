import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './app/store';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" exact>
            <h1>Welcome to Eco Auth App</h1>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;