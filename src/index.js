import React from 'react';
import Home from './components/App/Home';
import Acerca from './components/App/Acerca'
import {HashRouter, Route} from 'react-router-dom';
import Router from './components/App/Router/Router';

import ReactDOM from 'react-dom';

// Now we can render our application into it
ReactDOM.render((
    <Router/>
),document.getElementById('app'));
