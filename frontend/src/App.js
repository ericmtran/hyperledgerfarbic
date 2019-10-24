import React from 'react';
import './App.css';
import Home from './components/home';
import Chaincode from './components/Chaincode';
import Channel from './components/Channel';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter >
          <Switch>
            <Route exact path="/" component={Home} />          
            <Route path="/chaincode" component={Chaincode} />
            <Route path="/channel" component={Channel} />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
    
  );
}

export default App;
