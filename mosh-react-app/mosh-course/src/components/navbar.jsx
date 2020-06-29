import React, { Component } from "react";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar{" "}
          <span className="badge badge-secondary">{this.props.countOf}</span>
        </a>
      </nav>
    );
  }
}

export default Navbar;
