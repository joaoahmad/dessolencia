'use strict';

import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class MapStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { inPlace } = this.props

        let content;
        let classes = classNames("map-status", {
            "-notsafe": (inPlace.length),
        });
        if (inPlace.length) {
            content = inPlace.map((location, i) => (<div key="{i}">{location.feature.properties.name}</div>));
        }else{
            content = 'Ta tranquilo';
        }
        return (
            <div className={classes}>{content}</div>
        );
    }


}

module.exports = MapStatus;
