import React from "react";



export class ForgotCredentials extends React.Component {
// eslint-disable-next-line
  constructor(props) {
    super(props);
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
              <label htmlFor="username">Please enter your Email and we will send you a username reminder and a password reset link:</label>
              <input type="text" name="email" placeholder="email" />
            </div>
            
          </div>
        </div>
          <button type="submit" className="btn">
            Submit
          </button>
      </div>
    );
  }
}