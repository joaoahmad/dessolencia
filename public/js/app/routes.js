import React from 'react';
import Router, {Route, Redirect, IndexRoute, IndexRedirect} from 'react-router';
import App from './components/App';

// Pages
import Home from './components/pages/Home';

let routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
    </Route>
);

module.exports = routes;
