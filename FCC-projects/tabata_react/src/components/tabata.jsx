import React, { Component } from "react";
import Timer from "./timer";

class Tabata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      status: "session",
      intervalID: false,
    };
  }

  setIntervalID = (value) => {
    this.setState({
      intervalID: value,
    });
  };

  changeStatus = () => {
    this.setState({
      status: this.state.status === "session" ? "break" : "session",
    });
  };

  changeDuration = (event) => {
    const elementId = event.target.id;
    switch (elementId) {
      case "break-decrement":
        if (!this.state.intervalID) {
          this.setState({
            breakLength:
              this.state.breakLength !== 1 ? this.state.breakLength - 1 : 1,
          });
        }
        break;
      case "break-increment":
        if (!this.state.intervalID) {
          this.setState({
            breakLength:
              this.state.breakLength !== 60 ? this.state.breakLength + 1 : 60,
          });
        }
        break;
      case "session-decrement":
        if (!this.state.intervalID) {
          this.setState({
            sessionLength:
              this.state.sessionLength !== 1 ? this.state.sessionLength - 1 : 1,
          });
        }
        break;
      case "session-increment":
        if (!this.state.intervalID) {
          this.setState({
            sessionLength: this.state.sessionLength + 1,
          });
        }
        break;
      default:
        throw new Error("Change durration Error!");
    }
  };

  render() {
    return (
      <div id="tabata">
        <h2>Tabata Clock</h2>

        <div className="row">
          <div id="break-section" className="col-sm-6 col-xs-12">
            <div id="break-label">
              <span>Break Length</span>
            </div>
            <div id="break-navigation">
              <i
                id="break-decrement"
                onClick={this.changeDuration}
                className="fa fa-arrow-down pointers"
              ></i>

              <span id="break-length">{this.state.breakLength}</span>

              <i
                id="break-increment"
                onClick={this.changeDuration}
                className="fa fa-arrow-up pointers"
              ></i>
            </div>
          </div>

          <div id="session-section" className="col-sm-6 col-xs-12">
            <div id="session-label">
              <span>Session Length</span>
            </div>
            <div id="session-navigation">
              <i
                id="session-decrement"
                onClick={this.changeDuration}
                className="fa fa-arrow-down pointers"
              ></i>

              <span id="session-length">{this.state.sessionLength}</span>

              <i
                id="session-increment"
                onClick={this.changeDuration}
                className="fa fa-arrow-up pointers"
              ></i>
            </div>
          </div>
        </div>

        <Timer
          sessionLength={this.state.sessionLength}
          breakLength={this.state.breakLength}
          status={this.state.status}
          changeStatus={this.changeStatus}
          intervalID={this.state.intervalID}
          setIntervalID={this.setIntervalID}
        />
      </div>
    );
  }
}

export default Tabata;
