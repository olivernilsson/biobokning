const Sass = require("./sass");
const config = require("./config.json");

for (let conf of config.sass) {
  new Sass(conf);
}

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const CreateRestRoutes = require("./CreateRestRoutes");
const jsonflex = require("jsonflex")();
const fs = require("fs");
const path = require("path");
const connectionString = require("./connectionString.js");
const LoginHandler = require("./LoginHandler");
const settings = require("./settings.json");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

module.exports = class Server {
  constructor() {
    this.start();
  }

  async start() {
    await this.connectToDb();
    await this.startWebServer();
    //await this.testConsole();
    //await this.addFilms();
    //await this.addSalons();
    //await this.dropCollection();
  }

  connectToDb() {
    return new Promise((resolve, reject) => {
      mongoose.connect(connectionString, { useNewUrlParser: true });
      global.passwordSalt = settings.passwordSalt;
      global.db = mongoose.connection;
      db.on("error", () => reject("Could not connect to DB"));
      db.once("open", () => resolve("Connected to DB"));
    });
  }

  async addFilms() {
    let Film = require("./models/Film");
    let films = require("./www/json/movies.json");

    for (let data of films) {
      let film = new Film(data);
      await film.save();
    }
  }

  async addSalons() {
    let Salon = require("./models/Salon");
    let salons = require("./www/json/salons.json");

    for (let data of salons) {
      let salon = new Salon(data);
      await salon.save();
    }
  }

  dropCollection() {
    db.collection("movies").drop();
  }

  startWebServer() {
    // Create a web server
    const app = express();

    // Add body-parser to our requests
    app.use(bodyParser.json());

    // Serve static files from www
    app.use(express.static("www"));

    app.use(jsonflex);

    app.use(
      session({
        secret: settings.cookieSecret,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
          mongooseConnection: db
        })
      })
    );

    // Set keys to names of rest routes
    const models = {
      films: require("./models/Film"),
      salons: require("./models/Salon"),
      users: require("./models/User"),
      views: require("./models/View"),
      bookings: require("./models/Booking")
    };

    app.get("/autoload-js-and-templates", (req, res) => {
      let files = fs.readdirSync(path.join(__dirname, "/www/js"));
      files = files.filter(x => x.substr(-3) === ".js");
      let html = files.map(x => `<script src="/js/${x}"></script>`).join("");
      html += files
        .filter(x =>
          fs.existsSync(
            path.join(__dirname, "/www/templates", x.split(".js").join(".html"))
          )
        )
        .map(
          x =>
            `<script src="/template-to-js/${x
              .split(".js")
              .join(".html")}"></script>`
        )
        .join("");
      res.send(`document.write('${html}')`);
    });

    // Convert a template to a js render method
    app.get("/template-to-js/:template", (req, res) => {
      let html = fs.readFileSync(
        path.join(__dirname, "/www/templates", req.params.template)
      );
      html =
        req.params.template.split(".html")[0] +
        ".prototype.render = function(){ return `\n" +
        html +
        "\n`};";
      res.send(html);
    });

    // create all necessary rest routes for the models
    new CreateRestRoutes(app, db, models);

    // create special routes for login
    new LoginHandler(app, models.users);

    // Start the web server
    app.listen(3001, () => console.log("Listening on port 3001"));

    app.use((req, res, next) => {
      if (req.url === "/jsonflex.js" || req.url == "/json-save") {
        next();
        return;
      }
      res.sendFile(path.join(__dirname, "/www/index.html"));
    });
  }
};
