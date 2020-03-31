import React, { useState }from 'react';
import Todos from './components/Todos';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const App: React.FC<{ foo?: boolean }> = ({ foo }) => {
  // foo
  const [ login, setLogin ] = useState(false);  
  return (
    <Router>
        <Switch>
          <Route path={["/", "/login"]} exact render={(props) => <Login login={() => setLogin(true)} />}/>
          <Route path="/todos" exact component={Todos}/>
        </Switch>
        {login && <Redirect to="/todos" />}
    </Router>
  );
}

export default App;
