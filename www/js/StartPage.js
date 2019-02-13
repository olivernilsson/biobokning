class StartPage extends Component {

  constructor() {
    super();
    this.addRoute('/', 'Start');
    this.addEvents({
      'click .select-movie': 'selectMovie',

    })
    this.movies = [];
    this.movielist = [];
    this.moviePage = new MoviesAndTrailersPage();
    this.getMovies();
    this.singleMovie;




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




  selectMovie(e) {
    console.log(this.movielist)
    let id = $(e.currentTarget).attr('data-movie-id');
    let movie = this.movies.filter(movie => movie._id === id)[0];
    console.log(movie);
    this.moviePage.movieSelect(e)



  }

  mount() {
    this.render();
  }



} 