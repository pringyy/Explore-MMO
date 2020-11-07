import React from "react";
import axios from "axios";

export class Register extends React.Component {
// eslint-disable-next-line
  constructor(props) {
    super(props);
    this.state = {username: ''}
    this.state = {email: ''}
    this.state = {password: ''}
  }

  handleUsername = event => {
    this.setState({ username: event.target.value });
  }

  handleEmail = event => {
    this.setState({ email: event.target.value });
  }

  handlePassword = event => {
    this.setState({ password: event.target.value });
  }


  handleSubmit = event => {
    event.preventDefault();
    
    axios.post(`http://localhost:3000/api/user/register`, 
    { 
        username: this.state.username,
        email: this.state.email,
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
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={this.handleUsername}/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" placeholder="email" onChange={this.handleEmail}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" placeholder="password" onChange={this.handlePassword}/>
            </div>
          </div>
        </div>
          <button type="submit" className="btn">
            Register
          </button>
          </form>
      </div>
    );
  }
}
