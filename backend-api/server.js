const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const db = require("./app/models");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'votre_secret_ici',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new GoogleStrategy({
  clientID: '166684492742-oua3u9uvj6jersg78m3g89fr8m9opb5t.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:8080/auth/google/callback"
},
async function(accessToken, refreshToken, profile, cb) {
  try {
    const user = await db.user.findOrCreateGoogleUser(profile);
    return cb(null, user);
  } catch (error) {
    return cb(error, null);
  }
}
));

passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
try {
  const user = await db.user.findById(id);
  done(null, user);
} catch (error) {
  done(error, null);
}
});


app.get("/", (req, res) => {
  res.json({ message: "Welcome, DIMA RAJA." });
});

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

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});