class MoviesAndTrailersPage extends Component {
  constructor() {
    super();
    this.addRoute(/\/movie-details\/(.*)/);
    this.movies = [];
    this.viewings = [];
    this.youtube = "https://www.youtube.com/embed/";
    this.moviePrint();
    this.addEvents({
      "click .dropdown-item": "movieSelect",
      "click .view-select": "viewSelect",
      "click .trailer-close": "trailerClose"
    });

    this.testlist = [];
    this.view;
    this.bookPage = new BookingPage();
    this.pricePage = new PricePage();
    this.choosen = false;
    this.moviePrint();
  }

  async moviePrint() {
    this.movies = await Film.find();
    this.render();
  }

  async mount() {
    this.testlist.length = 0;
    let id = this.routeParts[0];
    let movie = await Film.find(id);
    await Object.assign(this, movie._props);
    document.title = "Film:" + this.title;
    this.movie = movie;
    this.title = movie.title;
    this.list = [];
    this.test = JSON.stringify(movie.title);
    this.viewings = await View.find(`.find({film:${this.test}})`);

    for (let view of this.viewings) {
      this.testlist.push(view);
    }
    this.render();
  }

  movieSelect(e) {
    this.testlist.length = 0;
    let id = $(e.currentTarget).attr("data-movie-id");
    let movie = this.movies.filter(movie => movie._id === id)[0];
    //console.log(movie);
    this.movie = movie;
    this.title = movie.title;
    Router.goto(`/movie-details/${id}`);
    this.render();
    this.viewingsfind(this.movie);
  }

  viewSelect(e) {
    let id = $(e.currentTarget).attr("data-view-id");
    let view = this.viewings.filter(view => view._id === id)[0];
    this.view = view;
    this.bookPage.change(this.view);
    Salon.current.chosenView = this.view._id;
    Salon.current.auditorium = this.view.auditorium;
    Salon.current.auditoriumSelector();
    this.render();
  }

  async viewingsfind(movie) {
    this.list = [];
    this.test = JSON.stringify(movie.title);
    this.viewings = await View.find(`.find({film:${this.test}})`);
    //this.viewings = await View.find();

    for (let view of this.viewings) {
      this.testlist.push(view);
      // console.log(JSON.stringify(view));
      //this.list.push(`<p>${JSON.stringify(view)}</p>`);
    }
    //console.log(this.viewings);
    this.render();
  }

  showTrailer() {
    this.trailer = this.movie.youtubeTrailers[0];
  }

  trailerClose() {
    //Stop Video
    $("#trailermodal").on("hidden.bs.modal", function(e) {
      // do something...
      $("#trailermodal iframe").attr(
        "src",
        $("#trailermodal iframe").attr("src")
      );
    });
  }
}
