import React from 'react';
import { Link } from 'react-router';
import Observer from '../Observer';

class Home extends React.Component {

  render() {

    return (
        <div className="container">
            <Observer />
        </div>
    );
  }

}

module.exports = Home;
