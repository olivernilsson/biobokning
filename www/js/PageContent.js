class PageContent extends Component {

  constructor(){
    super();
   
    this.startPage = new StartPage();
    this.aboutPage = new AboutPage();
    this.missingPage = new MissingPage();
    this.regPage = new RegPage();
    this.storePage = new StorePage(); 
    this.rulesPage =  new RulesPage();
    this.aboutSalons = new AboutSalons();
    this.moviesAndTrailersPage = new MoviesAndTrailersPage();
    App.moviesAndTrailersPage = this.moviesAndTrailersPage;
    this.userRegistration = new UserRegistration();
  

  }
  
  
}