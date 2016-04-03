'use strict';

import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
    constructor() {
        super();
        this.menu = [
            { label: 'Home', link: '/' },
            { label: 'Map', link: '/map' },
        ]
    }

    render() {
        
        var menu = this.menu.map((item, i) => {
            return (
                <li className="menu-item" key={i}>
                    <Link to={item.link} className="link">{item.label}</Link>
                </li>
            )
        });

        return (
            <div className="header">
                <div ref="navbar" className="header-nav">
                    <ul className="menu-list -inline">
                        {menu}
                    </ul>
                </div>
            </div>
        );
    }


}

module.exports = Navbar;
