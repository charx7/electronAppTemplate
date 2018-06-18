import React from 'react';
import Home from '../Home';
import Acerca from '../Acerca';
import {HashRouter, Route} from 'react-router-dom';

// Now we can render our application into it
class Router extends React.Component {
    render () {
        return (
            <HashRouter>
                <div>
                    <Route path = "/" component = {Home} exact = {true} />
                    <Route path = "/acerca" component = {Acerca} />
                </div>
            </HashRouter>
        )
    }
}

export default Router;
