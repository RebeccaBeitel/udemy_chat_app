const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");

const container = require("./container");

const url = "mongodb://localhost/udemy_chat_app";

container.resolve(function (users, _, admin, home) {
  mongoose.Promise = global.Promise;
  mongoose.connect(url, { useNewUrlParser: true });
  const app = SetupExpress();
  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(3000, function () {
      console.log("Listening on port 3000");
    });
    ConfigureExpress(app);

    // Set up router
    const router = require("express-promise-router")();
    users.SetRouting(router);
    admin.SetRouting(router);
    home.SetRouting(router);

    app.use(router);
  }

  function ConfigureExpress(app) {
    require("./passport/passport-local");
    require("./passport/passport-google");
    app.use(express.static("public"));
    app.use(cookieParser());
    app.set("view engine", "ejs");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(
      session({
        secret: "thisisasecretkey",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: url, touchAfter: 24 * 3600 }),
      })
    );
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.locals._ = _;
  }
});
