class StartPage extends Component {

  constructor() {
    super();
    this.addRoute('/', 'Start');
    this.mountCount = 0;
    this.movies = [];
    this.movielist = [];
    this.getMovies();

  }

  async getMovies() {
    this.movies = await Film.find();

    this.render();

  }

  selectMovie() {

  }

  mount() {
    this.mountCount++;
    this.render();
  }



} 