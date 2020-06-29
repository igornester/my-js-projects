import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    let element = document.getElementById("btn-" + this.props.counter.id);

    if (this.props.counter.value === 0)
      element.setAttribute("disabled", "disabled");
    else element.removeAttribute("disabled");
  }

  componentDidMount(prevProps, prevState) {
    let element = document.getElementById("btn-" + this.props.counter.id);

    if (this.props.counter.value === 0)
      element.setAttribute("disabled", "disabled");
  }

  render() {
    return (
      <div className="row counter" id={this.props.counter.id}>
        <div className="cal-3 m-1 zero">
          <div className="badge badge-warning ">
            {this.props.counter.value === 0 ? "Zero" : this.props.counter.value}
          </div>
        </div>
        <div className="cal-3 m-1">
          <button
            className="btn btn-secondary"
            onClick={() => this.props.onIncrement(this.props.counter.id)}
          >
            +
          </button>
        </div>
        <div className="cal-3 m-1">
          <button
            id={"btn-" + this.props.counter.id}
            className="btn btn-secondary decrement-btn"
            onClick={() => this.props.onDecrement(this.props.counter.id)}
          >
            -
          </button>
        </div>
        <div className="cal-3 m-1">
          <button
            className="btn btn-danger"
            onClick={() => this.props.onDelete(this.props.counter.id)}
          >
            x
          </button>
        </div>
      </div>
    );
  }
}

export default Counter;
