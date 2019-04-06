import React, { Component } from "react";

class PersonDetail extends Component {
  componentWillReceiveProps(newProps) {
    console.log("new props ", newProps);
  }

  shouldComponentUpdate(nextprops) {
    if (this.props.personInfo.name == "mona") {
      return false;
    } else {
      return true;
    }
  }
  render() {
    const { name, age } = this.props.personInfo;
    return (
      <div>
        <h1>{name}</h1>
        <p>{age}</p>
      </div>
    );
  }
}

export default PersonDetail;
