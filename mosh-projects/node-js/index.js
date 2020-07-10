const Logger = require("./logger");
const emmiter = new Logger();

emmiter.on("logger", (data) => console.log(data));

emmiter.log("Alex");
