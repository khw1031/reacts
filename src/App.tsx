import { Switch, Route, Redirect } from 'react-router-dom';

import { Login } from '@pages/Login';
import { SignUp } from '@pages/SignUp';

export function App() {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
}
