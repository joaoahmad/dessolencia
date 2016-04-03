import React from 'react';
import Router, {Route, Redirect, IndexRoute, IndexRedirect} from 'react-router';
import App from './components/App';

// Pages
import Home from './components/pages/Home';
import Map from './components/pages/Map';

let routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/map" component={Map} />
    </Route>
);

module.exports = routes;
