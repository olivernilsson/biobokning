class MoviesAndTrailersPage extends Component {

  constructor(){
    super();
    this.addRoute('/moviesandtrailers', 'Movies and Trailers');
    this.testCheckLogin();
    this.movieArray = [];
  }

  async testCheckLogin(){
    //console.log(await Film.find());
    this.movieArray = await Film.find();
    for(let i in this.movieArray){
    console.log(this.movieArray[i].title);
    }

  }
}