import { registerMicroApps, start } from 'qiankun';
import { useEffect } from 'react';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import './App.css';
import microApps from './microApps.json';

registerMicroApps(microApps);

function App() {
  const location = useLocation();

  useEffect(() => {
    start();
  }, [])

  return (
    <div className="App">
      <nav>
        <Link className={location.pathname === '/' && "active"} to="/">Home</Link>
        <Link className={location.pathname === '/app1' && "active"}  to="/app1">App1</Link>
        <Link className={location.pathname === '/app2' && "active"}  to="/app2">App2</Link>
      </nav>
      
      <div id="root"></div>
      <Switch>
        <Route exact path="/" render={_ => <div className="slogan">
          Welcome
        </div>} />
        {/* <Route path="/app1" render={_ => <div>
          <div id="root"></div>
        </div>} /> */}
      </Switch>
    </div>
  );
}

export default App;
