import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
    state = {  };

    render() {
        console.log(this.props)
        return (
            <div>Welcome to Our Website using React</div>
        );
    }
}

export default Home;