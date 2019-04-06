import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
    state = {  };
    goToAbout=()=>{

        this.props.history.push('/About')
    }
    render() {
        console.log(this.props.history)

        return (
            <div>
            Hello From Profile
            <button onClick={()=>this.goToAbout()}>Got to About</button>
            </div>
        );
    }
}

export default Profile ;