class StartPage extends Component {

  constructor() {
    super();
    this.addRoute('/', 'Start');

    this.movies = [];
    this.movielist = [];
    this.moviePage = new MoviesAndTrailersPage();
    this.getMovies();
    this.singleMovie;

    this.singleMovieTitle = '';
    this.singleMovieImg = '';
    this.singleMovieYear = '';
    this.singleMovieDesc = '';
    this.singleMovieId= '';

  }


 
  async getMovies() {
    this.movies = await Film.find();
 
    let newArr = this.movies.map(function (elem) {
      return {
        id: elem._id,
        title: elem.title,
        img: elem.images,
        year: elem.productionYear,
        desc: elem.description
      };
    });

    this.singleMovieTitle = newArr[4].title;
    this.singleMovieImg = newArr[4].img;
    this.singleMovieYear = newArr[4].year;
    this.singleMovieDesc = newArr[4].desc;
    this.singleMovieId = newArr[4].id;


    this.render();

  }






} 