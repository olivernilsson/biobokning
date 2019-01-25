const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CreateRestRoutes = require('./CreateRestRoutes');
const jsonflex = require('jsonflex')();
const fs = require('fs');
const path = require('path');
const connectionString = require('./connectionString.js');

module.exports = class Server {

  constructor() {
    this.start();
  }

  async start() {
    await this.connectToDb();
    await this.startWebServer();
    await this.testAdd();
    await this.testConsole();
    //await this.dropCollection();
  }

  connectToDb() {
    return new Promise((resolve, reject) => {
      mongoose.connect(connectionString, { useNewUrlParser: true });
      global.db = mongoose.connection;
      db.on('error', () => reject('Could not connect to DB'));
      db.once('open', () => resolve('Connected to DB'));
      console.log("hej");
    });
  }

  testConsole() {
    var found = db.collection('movies').find();
    found.each(function (err, doc) {
        console.log(doc);
    });
  }

  testAdd(){

    db.collection('movies').insertMany([
      { name: "film1",
        lenght: "120",
        age: "12+"},
        { name: "film2",
        lenght: "123",
        age: "125+"},
        { name: "film3",
        lenght: "102",
        age: "18+"},
    ])
  }

  dropCollection(){

    db.collection('movies').drop();
  }

  startWebServer() {

    // Create a web server
    const app = express();

    // Add body-parser to our requests
    app.use(bodyParser.json());

    // Serve static files from www
    app.use(express.static('www'));

    app.use(jsonflex);

    // Set keys to names of rest routes
    const models = {

    };

    app.get('/autoload-js-and-templates', (req, res) => {
      let files = fs.readdirSync(path.join(__dirname, '/www/js'));
      files = files.filter(x => x.substr(-3) === '.js')
      let html = files.map(x => `<script src="/js/${x}"></script>`).join('');
      html += files.filter(x => fs.existsSync(path.join(
          __dirname, '/www/templates', x.split('.js').join('.html')
      ))).map(x => `<script src="/template-to-js/${
        x.split('.js').join('.html')}"></script>`).join('');
      res.send(`document.write('${html}')`);
    });
    
    // Convert a template to a js render method
    app.get('/template-to-js/:template', (req, res) => {
      let html = fs.readFileSync(path.join(
        __dirname, '/www/templates', req.params.template));
      html = req.params.template.split('.html')[0] +
        '.prototype.render = function(){ return `\n' + html + '\n`};'
      res.send(html);
    });
    
    // create all necessary rest routes for the models
    new CreateRestRoutes(app, db, models);

    // Start the web server
    app.listen(3000, () => console.log('Listening on port 3000'));

    app.use((req, res, next) => {
      if(req.url === '/jsonflex.js' || req.url == '/json-save'){ next(); return; }
      res.sendFile(path.join(__dirname, '/www/index.html'));
    });

  }

}
