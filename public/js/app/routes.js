import React from 'react';
import Router, {Route, Redirect, IndexRoute, IndexRedirect} from 'react-router';
import App from './components/App';

// Pages
import Home from './components/pages/Home';
import Map from './components/pages/Map';
import Add from './components/pages/Add';

let routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Map}/>
        <Route path="/map" component={Map} />
        <Route path="/button" component={Home} />
        <Route path="/add" component={Add} />
    </Route>
);

module.exports = routes;
