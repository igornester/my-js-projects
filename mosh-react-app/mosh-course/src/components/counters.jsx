import React, { Component } from "react";
import Counter from "./counter";
import Navbar from "./navbar";

class Counters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counters: [
        { id: 1, value: 0 },
        { id: 2, value: 0 },
        { id: 3, value: 0 },
        { id: 4, value: 0 },
        { id: 5, value: 0 },
        { id: 6, value: 0 },
      ],
    };
  }

  handleIncrement = (id) => {
    let counters = this.state.counters.reduce((acc, element) => {
      let newElement = { ...element };
      if (newElement.id === id) newElement.value++;
      acc.push(newElement);
      return acc;
    }, []);

    this.setState({ counters });
  };

  handleDecrement = (id) => {
    let counters = this.state.counters.reduce((acc, element) => {
      let newElement = { ...element };
      if (newElement.id === id) newElement.value--;
      acc.push(newElement);
      return acc;
    }, []);

    this.setState({ counters });
  };

  handleDelete = (id) => {
    let counters = this.state.counters.filter((element) => element.id !== id);
    this.setState({ counters });
  };

  handleRefresh = () => {
    let newCounters = [];

    this.state.counters.forEach((element) => {
      let newElement = { ...element };
      newElement.value = 0;
      newCounters.push(newElement);
    });

    this.setState({ counters: newCounters });
  };

  render() {
    return (
      <div>
        <Navbar
          countOf={
            this.state.counters.filter((element) => element.value != 0).length
          }
        />
        <div id="refresh">
          <button className="btn btn-primary" onClick={this.handleRefresh}>
            Refresh
          </button>
        </div>
        <div id="counters">
          {this.state.counters.map((value) => (
            <Counter
              key={value.id}
              counter={value}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
              onDelete={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Counters;
