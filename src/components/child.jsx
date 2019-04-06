import React, { Component } from 'react';
import PropTypes from 'prop-types';

class child extends Component {
    constructor(props){
        super(props)
        this.state = { 
        }
    }
    render() {
        const {visible,condition} = this.props;
        
        

        return (
            <div>

           <div>{this.props.textofLable1}</div> 
           <input/>
           {
               
            // visible?<div>Hello</div>:condition?<div>Welcome</div>:<div/>
             visible ? (<div>hello</div>) : (condition ? <div>welcome</div>:null)
           }

           </div>
        );
    
}
}
export default child ;