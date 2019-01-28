const Sass = require('./sass');
const config = require('./config.json');
 
for(let conf of config.sass){
    new Sass(conf);
} 

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
    await this.testConsole();
    //await this.testAdd();
    //await this.addSalons();
    //await this.addViewings();
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
      //console.log(doc);
    });
  }
 
  testAdd() {
    db.collection('movies').insertMany([
      {
        "title": "Call me by your name",
        "productionCountries": [
          "Italien",
          "USA"
        ],
        "productionYear": 2017,
        "length": 132,
        "genre": "Drama",
        "distributor": "UIP",
        "language": "engelska",
        "subtitles": "svenska",
        "director": "Luca Guadagnino",
        "actors": [
          "Armie Hammer",
          "Timothée Chalamet",
          "Michael Stuhlbarg"
        ],
        "description": "<p>Filmen utspelas i norra Italien sommaren 1983. En ung amerikansk-italienare blir förälskad i en amerikansk student som kommer för att studera och bo hos hans familj.</p><p>Tillsammans upplever de en oförglömlig sommar - full av musik, mat och kärlek - som för evigt kommer att förändra dem.</p>",
        "images": [
          "call-me-poster1.jpg"
        ],
        "youtubeTrailers": [
          "Z9AYPxH5NTM"
        ],
        "reviews": [
          {
            "source": "Sydsvenskan",
            "quote": "ett drama berättat med stor ömhet",
            "stars": 4,
            "max": 5
          },
          {
            "source": "Svenska Dagbladet",
            "quote": "en film att förälska sig i",
            "stars": 5,
            "max": 5
          },
          {
            "source": "DN",
            "quote": "en het romans i åttiotalskostym",
            "stars": 4,
            "max": 5
          }
        ]
      },
      {
        "title": "Glass",
        "productionCountries": [
          "USA"
        ],
        "productionYear": 2019,
        "length": 129,
        "genre": "Thriller",
        "distributor": "Universal Pictures",
        "language": "engelska",
        "subtitles": "svenska",
        "director": "M. Night Shyamalan",
        "actors": [
          "James McAvoy",
          "Bruce Willis",
          "Samuel L. Jackson",
          "Sarah Paulson"
        ],
        "description": "<p>'Glass' är den sista delen i en trilogi som började med filmen 'Unbreakable'. I den filmen konfronterades den intelligente Elijah Price (Samuel L. Jackson) med den överstarke privatpolisen David Dunn (Bruce Willis).</p><p> I denna tredje film återförenas dem för att göra en sista kraftmätningen mot samhället som förnekar deras existens.</p>",
        "images": [
          "glass-poster.jpg"
        ],
        "youtubeTrailers": [
          "95ghQs5AmNk"
        ],
        "reviews": [
          {
            "source": "Sydsvenskan",
            "quote": "Förargelseväckande tråkigt",
            "stars": 1,
            "max": 5
          },
          {
            "source": "Svenska Dagbladet",
            "quote": "Mörk dårhusthriller vill ta ner superhjältarna på jorden",
            "stars": 2,
            "max": 5
          },
          {
            "source": "DN",
            "quote": "En trio med superkrafter - eller vanföreställningar?",
            "stars": 2,
            "max": 5
          }
        ]
      },
      {
        "title": "Burning",
        "productionCountries": [
          "Korea"
        ],
        "productionYear": 2017,
        "length": 148,
        "genre": "Drama",
        "distributor": "Pine House Film",
        "language": "koreanska",
        "subtitles": "svenska",
        "director": "Chang-dong Lee",
        "actors": [
          "Ah-in Yoo",
          "Steven Yuen",
          "Jong-seo Jun"
        ],
        "description": "<p>Jong-su stöter på Hae-Mi som brukade bo i samma grannskap. Hae-mi ber Jong-su att ta hand om hennes katt medans hon reser till Afrika.</p><p>När Hae-mi återvänder introducerar hon Ben, en mystisk man hon träffat i Afrika, till Jong-su.</p>",
        "images": [
          "burning-poster.jpg"
        ],
        "youtubeTrailers": [
          "wi6Kw7V8gXk"
        ],
        "reviews": [
          {
            "source": "Imdb",
            "quote": "Långsam brand, men värt väntan",
            "stars": 7.7,
            "max": 10
          },
          {
            "source": "Svenska Dagbladet",
            "quote": "Murakami-filmatisering som frossar i det obekväma",
            "stars": 4,
            "max": 5
          },
          {
            "source": "DN",
            "quote": "Den talangfulle mr Ripley-vibbar",
            "stars": 4,
            "max": 5
          }
        ]
      },
      {
        "title": "Vox lux",
        "productionCountries": [
          "Storbritannien"
        ],
        "productionYear": 2018,
        "length": 114,
        "genre": "Drama",
        "distributor": "Killer Films",
        "language": "engelska",
        "subtitles": "svenska",
        "director": "Brady Corbet",
        "actors": [
          "Natalie Portman",
          "Jude Law",
          "Willem Dafoe"
        ],
        "description": "<p>Vox lux följer livet på Celese under 18år. Från dess att hon överlevt en våldsam tragedi till dess att hon blir en välkänd pop-stjärna</p><p>Efter en periods frånvaro från scenen, återvänder Celeste till allmänhetens kännedom.</p>",
        "images": [
          "vox-lux-poster.jpg"
        ],
        "youtubeTrailers": [
          "dolxUIZzb3w"
        ],
        "reviews": [
          {
            "source": "Imdb",
            "quote": "Intressant och artsy drama med Natalie Portman i framkant",
            "stars": 6.4,
            "max": 10
          },
          {
            "source": "Svenska Dagbladet",
            "quote": "Pubertalt ambitiöst - men Portman väger upp allt",
            "stars": 3,
            "max": 5
          },
          {
            "source": "DN",
            "quote": "Ångestladdade idolskildringen Vox lux en filmisk milstolpe",
            "stars": 4,
            "max": 5
          }
        ]
      },
      {
        "title": "Girl",
        "productionCountries": [
          "Belgien",
          "Nederländerna"
        ],
        "productionYear": 2019,
        "length": 109,
        "genre": "Drama",
        "distributor": "Menuet Producties",
        "language": "franska",
        "subtitles": "svenska",
        "director": "Lukas Dhont",
        "actors": [
          "Victor Polster",
          "Arieh Worthalter",
          "Oliver Bodart"
        ],
        "description": "<p>Lara är en 15-årig tjej, född i en pojk-kropp, med drömmar att bli en balllerina-dansös.</p>",
        "images": [
          "girl-poster.jpg"
        ],
        "youtubeTrailers": [
          "Kdzu26tnUTc"
        ],
        "reviews": [
          {
            "source": "Imdb",
            "quote": "Bra, men inte sensationellt",
            "stars": 7.3,
            "max": 10
          },
          {
            "source": "DN",
            "quote": "Dansanta 'Girl' är en hudlös skildring av normbrytande ballerina",
            "stars": 3,
            "max": 5
          }
        ]
      },
      {
        "title": "Hunter killer",
        "productionCountries": [
          "Storbritannien",
          "USA",
          "Kina"
        ],
        "productionYear": 2018,
        "length": 122,
        "genre": "Krigthriller",
        "distributor": "UIP",
        "language": "engelska",
        "subtitles": "svenska",
        "director": "Donovan Marsh",
        "actors": [
          "Gegard Butler",
          "Gary Oldman",
          "Toby Stephens"
        ],
        "description": "<p>En oerfaren ubåts kapten samarbetar med Navy Seals i hopp om att frigöra en kidnappad rysk president</p>",
        "images": [
          "hunter-killer-poster.jpg"
        ],
        "youtubeTrailers": [
          "QAhcDHRZOak"
        ],
        "reviews": [
          {
            "source": "Sydsvenskan",
            "quote": "Skamligt mager roll för Nyqvist",
            "stars": 2,
            "max": 5
          },
          {
            "source": "DN",
            "quote": "Ubåtsfilmen Hunter killer mest spännande under ytan",
            "stars": 2,
            "max": 5
          },
          {
            "source": "Imdb",
            "quote": "Vilken resa!",
            "stars": 6.7,
            "max": 10
          }
        ]
      },
      {
        "title": "Black mirror: Bandersnatch",
        "productionCountries": [
          "Storbritannien",
          "USA"
        ],
        "productionYear": 2018,
        "length": 150,
        "genre": "Skräck",
        "distributor": "House Of Tomorrow",
        "language": "engelska",
        "subtitles": "svenska",
        "director": "David Slade",
        "actors": [
          "Fionn Whitehead",
          "Craig Parkinson",
          "Alice Lowe"
        ],
        "description": "<p>Året är 1984 och en ung programmerare börjar ifrågasätta verkligheten samtidigt som han försöker skapa ett spel baserad på en novel.</p>",
        "images": [
          "black-mirror-poster.jpg"
        ],
        "youtubeTrailers": [
          "XM0xWpBYlNM"
        ],
        "reviews": [
          {
            "source": "Sydsvenskan",
            "quote": "Liknar inget som jag har sett tidigare",
            "stars": 4,
            "max": 5
          },
          {
            "source": "Imdb",
            "quote": "Underhållande och bra idé, men Meh",
            "stars": 7.4,
            "max": 10
          }
        ]
      },
      {
        "title": "Border",
        "productionCountries": [
          "Sverige",
          "Danmark"
        ],
        "productionYear": 2018,
        "length": 108,
        "genre": "Thriller",
        "distributor": "TriArt",
        "language": "svenska",
        "subtitles": "svenska",
        "director": "Ali Abbassi",
        "actors": [
          "Eva Melander",
          "Eero Milonoff",
          "Viktor Åkerblom"
        ],
        "description": "<p>En gränsvakt med förmågan att känna lukten av rädlsa drar till sig uppmärksamhet från en okänd resenär.</p>",
        "images": [
          "border-poster.jpg"
        ],
        "youtubeTrailers": [
          "QMs28A1s1OA"
        ],
        "reviews": [
          {
            "source": "Sydsvenskan",
            "quote": "Rörande och magisk",
            "stars": 4,
            "max": 5
          },
          {
            "source": "Svenska Dagbladet",
            "quote": "Liknar inte något ni sett förut",
            "stars": 5,
            "max": 5
          },
          {
            "source": "DN",
            "quote": "Vältänkt, välspelad och vacker",
            "stars": 5,
            "max": 5
          }
        ]
      }
    ])
  }

  addSalons() {
    db.collection('salons').insertMany([
      {
        "name": "Stora Salongen",
        "seatsPerRow": [
          8,
          9,
          10,
          10,
          10,
          10,
          12,
          12
        ]
      },
      {
        "name": "Mellan Salongen",
        "seatsPerRow": [
          8,
          9,
          10,
          10,
          10,
          12,
          12
        ]
      },
      {
        "name": "Lilla Salongen",
        "seatsPerRow": [
          6,
          8,
          9,
          10,
          10,
          12
        ]
      }
    ])
  } 

  addViewings() { 
    db.collection('viewings').insertMany([
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-22",
        "time": "18.40"
      },
      {
        "auditorium": "Mellan Salongen",
        "film": "",
        "date": "2018-01-22",
        "time": "18.40"
      },
      {
        "auditorium": "Lilla Salongen",
        "film": "",
        "date": "2018-01-22",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-23",
        "time": "18.40"
      },
      {
        "auditorium": "Mellan Salongen",
        "film": "",
        "date": "2018-01-23",
        "time": "18.40"
      },
      {
        "auditorium": "Lilla Salongen",
        "film": "",
        "date": "2018-01-23",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-24",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-24",
        "time": "18.40"
      },
      {
        "auditorium": "Mellan Salongen",
        "film": "",
        "date": "2018-01-24",
        "time": "18.40"
      },
      {
        "auditorium": "Lilla Salongen",
        "film": "",
        "date": "2018-01-25",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-25",
        "time": "18.40"
      },
      {
        "auditorium": "Mellan Salongen",
        "film": "",
        "date": "2018-01-25",
        "time": "18.40"
      },
      {
        "auditorium": "Lilla Salongen",
        "film": "",
        "date": "2018-01-26",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-26",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-26",
        "time": "18.40"
      },
      {
        "auditorium": "Mellan Salongen",
        "film": "",
        "date": "2018-01-27",
        "time": "18.40"
      },
      {
        "auditorium": "Lilla Salongen",
        "film": "",
        "date": "2018-01-27",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-27",
        "time": "18.40"
      },
      {
        "auditorium": "Mellan Salongen",
        "film": "",
        "date": "2018-01-28",
        "time": "18.40"
      },
      {
        "auditorium": "Lilla Salongen",
        "film": "",
        "date": "2018-01-28",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-28",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-29",
        "time": "18.40"
      },
      {
        "auditorium": "Mellan Salongen",
        "film": "",
        "date": "2018-01-29",
        "time": "18.40"
      },
      {
        "auditorium": "Lilla Salongen",
        "film": "",
        "date": "2018-01-29",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-30",
        "time": "18.40"
      },
      {
        "auditorium": "Mellan Salongen",
        "film": "",
        "date": "2018-01-30",
        "time": "18.40"
      },
      {
        "auditorium": "Lilla Salongen",
        "film": "",
        "date": "2018-01-30",
        "time": "18.40"
      },
      {
        "auditorium": "Stora Salongen",
        "film": "",
        "date": "2018-01-31",
        "time": "18.40"
      }
    ])
  }

  dropCollection() {

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
      film: require('./models/Film'),
      salong: require('./models/Salong'),
      ticket: require('./models/Ticket'),
      user: require('./models/User'),
      view: require('./models/View')

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
      if (req.url === '/jsonflex.js' || req.url == '/json-save') { next(); return; }
      res.sendFile(path.join(__dirname, '/www/index.html'));
    });
  
  } 
   
}    
