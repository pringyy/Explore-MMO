import React from "react";
import axios from "axios";


export class Login extends React.Component {
// eslint-disable-next-line
  constructor(props) {
    super(props);
  }


  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

   /** const user = {
      name: this.state.name
    };**/

    axios.post(`http://localhost:3000/api/user/login`, 
    { 
        username: "hello1234",
        password: "hello1234"
    
    }, {headers: {"Access-Control-Allow-Origin":'*'}})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }



  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
            
          </div>
        </div>
            <form onSubmit ={this.handleSubmit}>
          <button type="submit"  className="btn">
            Submit
          </button>
          </form>
      </div>
    );
  }
}