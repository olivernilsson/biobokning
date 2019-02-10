class StartPage extends Component {

  constructor() {
    super();
    this.addRoute('/', 'Start');
    this.addEvents({
      'click .select-movie': 'selectMovie',

    })
    this.mountCount = 0;
    this.movies = [];
    this.movielist = [];
    this.moviePage = new MoviesAndTrailersPage();
    this.getMovies();



  }

  async getMovies() {
    this.movies = await Film.find();


    let newArr = this.movies.map(function (elem) {
      return {
        title: elem.title,
        img: elem.images
      };
    });

    this.movielist.push(newArr)


    this.name = newArr[4].title;
    this.image = newArr[4].img[0];


    console.log(this.image)
    this.mount();




  }



  selectMovie(e) {
    console.log(this.movielist)
    let id = $(e.currentTarget).attr('data-movie-id');
    let movie = this.movies.filter(movie => movie._id === id)[0];
    console.log(movie);
    this.moviePage.movieSelect(e)



  }

  mount() {
    this.mountCount++;
    this.render();
  }



} 