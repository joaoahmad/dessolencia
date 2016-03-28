'use strict';

import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class MapStatus extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        let content;
        let classes = classNames("map-status", {
            "-notsafe": (this.props.dangers.length > 0),
        });
        if (this.props.dangers.length) {
            content = this.props.dangers.map((location, i) => (<div key="{i}">{location.feature.properties.name}</div>));
        }else{
            content = 'Ta tranquilo';
        }
        return (
            <div className={classes}>{content}</div>
        );
    }


}

module.exports = MapStatus;
