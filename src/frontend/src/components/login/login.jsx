import React from "react";
import axios from "axios";

export class Login extends React.Component {
// eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {username: ''}
    this.state = {password: ''}
    this.state = {password: ''}
  }

  handleUsername= event => {
    this.setState({ username: event.target.value });
    
  }

  handlePassword= event => {
    this.setState({ password: event.target.value });
 
  }

  handleSubmit = event => {
    event.preventDefault();
    axios.post(`http://localhost:3000/api/user/login`, 
    { 
        username: this.state.username,
        password: this.state.password
    
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      
      <div className="base-container" ref={this.props.containerRef}>
        <form onSubmit ={this.handleSubmit}>
          <div className="header">Login</div>
          <div className="content">
            <div className="image">
            </div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="username"  onChange={this.handleUsername} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" aria-hidden = "true" placeholder="password" onChange={this.handlePassword} />
              </div>
            </div>
          </div>
              
            <button type="submit"  className="btn">
              Submit
            </button>
        </form>   
      </div>
      
    );
  }
}