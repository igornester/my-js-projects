const EventEmmiter = require("events");
const emmiter = new EventEmmiter();

class Logger extends EventEmmiter {
  log(name) {
    console.log(`My name is ${name}`);
    this.emit("logger", { id: 1, message: "first message" });
  }
}

module.exports = Logger;
