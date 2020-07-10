const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/api") {
    res.write(JSON.stringify([1, 2, 3, 4]));
    res.end();
  }
});

server.on("connection", (socket) => {
  console.log("Connection UP on socket " + socket);
});

server.listen(4000);
console.log("Listening port 4000...");
