import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {NavLink,Link} from 'react-router-dom'

class Navigation extends Component {
    state = {  };

    render() {
        return (
            <nav>
            <ul>
            <li>
            <NavLink exact to="/" >Profile</NavLink>
            </li>
            <li>
            <NavLink exact to="/About" >About</NavLink>
            </li>
            <li>
            <NavLink activeClassName exact to="/Home" >Home</NavLink>

            </li>
            </ul>
            <li>
            <Link to={ {pathname:'/About'} }>About</Link>
            </li>
            </nav>

        );
    }
}

export default Navigation;