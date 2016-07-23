"use strict";

// TODO: enable https

// initialize variables
let bodyParser = require("body-parser");
let express = require("express");
let path = require("path");
let session = require("express-session");
let app = express();

// config server
app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: "allyourbasearebelongtous",
  resave: false,
  saveUninitialized: false,
  // TODO implement https and secure sessions
  cookie: { secure: false },
}));

// handle api requests
app.use("/api", require("./api/api").default);

// redirect html requests to index.html
app.use(function (req, res, next) {
  if (path.extname(req.path).length === 0) {
    req.url = "/index.html";
  }
  next();
});

// serve static assets
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/web"));

// start web server
app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});
