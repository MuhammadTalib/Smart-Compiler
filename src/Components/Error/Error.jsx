import React, { Component } from "react";
import "./style.css";

class Error extends Component {
  state = {
    regex: "",
  };
  render() {
    return (
      <div className="errorwrapper">
        <input
          onChange={(e) => this.setState({ regex: e.target.value })}
          type="string"
          value={this.state.regex}
          onKeyPress={(e) => {
            var key = e.which ? e.which : e.keyCode;
            if (key === 13) {
              //Regex(this.state.regex)
            }
          }}
        ></input>
      </div>
    );
  }
}

export default Error;
