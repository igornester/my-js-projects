import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);
    const { status, sessionLength, breakLength } = this.props;
    this.state = {
      currentMinutes: status === "session" ? sessionLength : breakLength,
      currentSeconds: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { status, sessionLength, breakLength } = this.props;

    if (
      (status === "session" && sessionLength !== prevProps.sessionLength) ||
      (status === "break" && breakLength !== prevProps.breakLength)
    ) {
      this.setState({
        currentMinutes: sessionLength,
        currentSeconds: 0,
      });
    }
  }

  refreshClick = () => {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0.0;

    const { status, sessionLength, breakLength } = this.props;
    this.setState({
      currentMinutes: status === "session" ? sessionLength : breakLength,
      currentSeconds: 0,
    });
  };

  playClick = (duration) => {
    if (this.props.intervalID) return;

    let id = setInterval(
      () => {
        let seconds =
          this.state.currentMinutes * 60 + this.state.currentSeconds - duration;

        if (seconds === 0) {
          document.getElementById("beep").play();

          this.props.changeStatus();

          this.setState({
            currentMinutes:
              this.props.status === "session"
                ? this.props.sessionLength
                : this.props.breakLength,
            currentSeconds: 0,
          });

          seconds =
            this.state.currentMinutes * 60 +
            this.state.currentSeconds -
            duration;
        }

        this.setState({
          currentMinutes: Math.trunc(seconds / 60),
          currentSeconds: seconds - Math.trunc(seconds / 60) * 60,
        });
      },

      duration * 1000
    );

    this.props.setIntervalID(id);
  };

  stopClick = () => {
    clearInterval(this.props.intervalID);
    this.props.setIntervalID(false);
  };

  static digitsToStr(value) {
    return String(value).length < 2 ? "0" + value : "" + value;
  }

  getClasses = () => {
    const badgeClass = "badge badge-";
    return this.props.status === "session"
      ? badgeClass + "primary"
      : badgeClass + "secondary";
  };

  render() {
    const { currentMinutes, currentSeconds } = this.state;
    return (
      <div id="timer">
        <div id="timer-lable">{this.props.status}</div>
        <div id="time-left">
          <span className={this.getClasses()}>
            {Timer.digitsToStr(currentMinutes) +
              ":" +
              Timer.digitsToStr(currentSeconds)}
          </span>
        </div>
        <div id="controls">
          <div id="start-stop">
            <i
              className="fa fa-play pointers"
              onClick={() => this.playClick(1)}
            ></i>
            <i className="fa fa-pause pointers" onClick={this.stopClick}></i>
          </div>
          <div id="reset">
            <i
              className="fa fa-refresh pointers"
              onClick={this.refreshClick}
            ></i>
          </div>
        </div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </div>
    );
  }
}

export default Timer;
