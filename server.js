// require modules
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers: require("./utils/helpers") });

// create express app and set port
const app = express();
const PORT = process.env.PORT || 3001;

// set up session object with secret, cookie, and store
const sess = {
  secret: 'secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess)); // session middleware with session object
app.use(express.json()); // parse incoming JSON
app.use(express.urlencoded({ extended: true })); // URL-encoded data
app.use(express.static("public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use( // session middleware
  session({
    secret: process.env.SECRET,
    store: new SequelizeStore({ db: sequelize }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(routes); // routes from controller
sequelize.sync({ force: false }).then(() => { // syncing sequelize models with database
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
