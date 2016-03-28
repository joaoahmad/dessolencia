'use strict';

import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  componentWillUpdate() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div id="layout" ref="layout" className="content-wrapper">
        {this.props.children}
      </div>
    );
  }


}

module.exports = App;
