import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
} from 'react-router-dom';
import ResidenceAddressForm from './components/forms/ResidenceAddressForm';
import HomeAddressForm from './components/forms/HomeAddressForm';
import CompanyAddressForm from './components/forms/CompanyAddressForm';

const App = () => {
  return (
    <HashRouter basename='/'>
      <Fragment>
        <Route exact path='/' component={ResidenceAddressForm} />
        <Switch>
          <Route exact path='/home-address-form' component={HomeAddressForm} />
          <Route
            exact
            path='/company-address-form'
            component={CompanyAddressForm}
          />
        </Switch>
      </Fragment>
    </HashRouter>
  );
};

export default App;
