import React, { Component } from "react";
import PersonDetail from "./personDetail";

class PersonsData extends Component {
  state = {
    persons: [
      { name: "ahmed", age: 25 },
      { name: "sayed", age: 30 },
      { name: "mona", age: 100 },
     
    ]
  };

  componentWillMount()
  {
      console.log('will mount')
  }

  componentDidMount(){
      console.log('did mount')
  }

  changeData = () => {
      this.setState({
          persons: [
            { name: "dakjdnask", age: 25 },
            { name: "dsssads", age: 30 },
            { name: "7seen", age: 100 },
          ]
      })
  }

  render() {

      let arr = this.state.persons.map((element) => {
          const {name,age} = element;
          return (
                <PersonDetail  personInfo={{
                    name: name,
                    age: age
                  }}/>
            )
    })
    return (
      <div>
      <button onClick={this.changeData}> change data</button>
        {arr}

      </div>
    );
  }
}
export default PersonsData;
