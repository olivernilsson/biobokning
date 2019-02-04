class MoviesAndTrailersPage extends Component {

  constructor(){
    super();
    this.addRoute('/moviesandtrailers', 'Movies and Trailers');
    this.movies = [];
    this.moviePrint();
    this.addEvents({
      'click .dropdown-item': 'movieSelect'
    })
  }


  async moviePrint(){
    this.movies = await Film.find();
    console.log(this.movies);
    this.render();

  }

  movieSelect(e){
    let id = $(e.currentTarget).attr('data-movie-id');
    let movie = this.movies.filter(movie => movie._id === id)[0];
    //console.log(movie);
    this.movie = movie;
    this.render();
    this.viewingsfind(this.movie)

  }
  
  async viewingsfind(movie){
    console.log(movie.title);
    this.test = JSON.stringify(movie.title)
    this.viewings = await View.find(`.find({film:${this.test}})`);
    console.log(this.viewings);
  }
}