class MoviesAndTrailersPage extends Component {

  constructor(){
    super();
    this.addRoute('/moviesandtrailers', 'Movies and Trailers');
    this.movieArray = [];
    this.moviePrint();
  }


  //incorrect, dont use
  async moviePrint(){
    //console.log(await Film.find());
    let movies = await Film.find();
    console.log(movies);
    for(let movie of movies){
    this.movieArray.push(movie.title);
    }
    console.log(this.movieArray);
    this.render();

  }
}