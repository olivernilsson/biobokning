class MoviesAndTrailersPage extends Component {

  constructor() {
    super();
    this.addRoute('/moviesandtrailers', 'Movies and Trailers');
    this.movies = [];
    this.viewings = [];
    this.moviePrint();
    this.addEvents({
      'click .dropdown-item': 'movieSelect',
      'click #select-view': 'viewSelect'
    })

    this.testlist = [];
    this.selectedView;
    this.bookPage = new BookingPage();
    this.choosen = false;


  }



  changeVal() {
    this.choosen = false;
    this.render();
  }

  async moviePrint() {
    this.movies = await Film.find();
    //console.log(this.movies);
    this.render();

  }

  


 movieSelect(e) {
    
    let id = $(e.currentTarget).attr('data-movie-id');
    let movie = this.movies.filter(movie => movie._id === id)[0];
    //console.log(movie);
    this.movie = movie;
    this.title = movie.title;
    this.render();
    this.viewingsfind(this.movie)

  }


  viewSelect(e) {
    let id = $(e.currentTarget).attr('data-view-id');
    let view = this.viewings.filter(view => view._id === id)[0];
    this.view = view;
    this.selectedView = view;
    this.choosen = true;
    this.bookPage.change(view);
    this.render();

  }

  async viewingsfind(movie) {
    console.log(movie.title);
    this.list = [];
    this.test = JSON.stringify(movie.title)
    this.viewings = await View.find(`.find({film:${this.test}})`);
    //this.viewings = await View.find();

    for (let view of this.viewings) {
      this.testlist.push(view);
      console.log("ashfajfj")
      // console.log(JSON.stringify(view));
      //this.list.push(`<p>${JSON.stringify(view)}</p>`);
    }
    //console.log(this.viewings);
    this.render();

  }


}

