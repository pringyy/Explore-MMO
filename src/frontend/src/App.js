import React from "react";
import "./App.scss";
import { Login, Register, ForgotCredentials } from "./components/login/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginActive: true,
      registerActive: false,
     
    };
  }

  componentDidMount() {
    this.rightSide.classList.add("right");
 
    
  }

  changeState() {
    const { loginActive } = this.state;
    const { registerActive } = this.state;
    
    

    if (loginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else if (registerActive){
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    } else {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    }
    this.setState(prevState => ({ loginActive: !prevState.loginActive }));
    this.setState(prevState => ({ registerActive: !prevState.registerActive }));
  }

  render() {
    const { loginActive } = this.state;
    const { registerActive } = this.state;
    const current = loginActive ? "Register" : "Login";
    const currentActive = loginActive ? "login" : "register";
    return (
      <div className="App">
        <div className="login">
          <div className="container" ref={ref => (this.container = ref)}>
            {loginActive && (
              <Login containerRef={ref => (this.current = ref)} />
            )}
            {registerActive && (
              <Register containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <RightSide
            current={current}
            currentActive={currentActive}
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this)}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">{props.current}</div>
      </div>
    </div>
  );
};

export default App;
