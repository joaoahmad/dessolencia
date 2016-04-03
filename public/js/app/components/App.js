'use strict';

import React from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';

class App extends React.Component {
  constructor() {
    super();
  }

  _getLoginState(){
  }

  componentDidMount(){
  }

  render() {
    return (
      <div id="layout" ref="layout" className="content-wrapper">
        <Navbar />
        {this.props.children}
      </div>
    );
  }


}

module.exports = App;
