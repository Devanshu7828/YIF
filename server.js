require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const ejsLayouts = require("express-ejs-layouts");
const port = process.env.PORT || 3000;
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const connectflash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
const cookieParser = require("cookie-parser");

// show routes
app.use(morgan("dev"));

// DB
require("./database/database");

// cookie
app.use(cookieParser());
// INITIALISE SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    store: MongoDbStore.create({ mongoUrl: process.env.MONGO_URL }),
    collection: "session",
    saveUninitialized: false,

    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24hours
  })
);

// PASSPORT
const LocalInit = require("./passportStatergy/localStatergy");
const googleInit = require("./passportStatergy/googleStatergy");
const facebookInit = require("./passportStatergy/facebookStatergy");

LocalInit(passport);
googleInit(passport);
facebookInit(passport);

app.use(passport.initialize());
app.use(passport.session());

// GLOBAL MIDDLEWARE
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// FLASH
app.use(connectflash());

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(ejsLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Guest MIDDLEWARE

// ROUTES
app.use("/", require("./routes/routes"));

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
