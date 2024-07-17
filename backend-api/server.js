const express = require("express");
const http = require("http"); 
const socketIo = require("socket.io");
const cors = require("cors");
const db = require("./app/models");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
    allowedHeaders: ["x-access-token", "Content-Type"],
    credentials: true
  }
});

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/article.routes')(app);
require('./app/routes/comment.routes')(app); 


io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("newComment", (comment) => {
    io.emit("newComment", comment);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set('io', io);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

