import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Home from '../components/App/Home';
import Acerca from '../components/App/Acerca';
import '../assets/css/App.css';

class App extends React.Component {
  
  render() {
    return (
      <div>
        <Switch>
          {console.log('holi')}
          <Route path = "/acerca" exact = {true} Component = {Acerca}/>
          <Route path = "/" exact = {true} Component = {Home}/>
        </Switch>
      </div>
    );
  }
}
export default App;
