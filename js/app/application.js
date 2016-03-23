import React from 'react';
import ReactDom from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
// import history from './history';
import routes from './routes';

ReactDom.render((<Router history={browserHistory}>{routes}</Router>), document.getElementById('app'));
