class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Om oss', '/about'),
      new NavItem('Filmer & trailers', '/movie-details/')
    ];

    this.userRegistration = new UserRegistration();
    this.userLogin = new UserLogin();
    NavBar.current = this;
    this.email;
  }
  
  async toggleRegisterButton(){
    this.userRegistration = false;
    this.logg = await Login.find();
    this.email = this.logg.email;
    this.render();
  }
  
  removeEmail(){
    this.email = ''; 
    this.userRegistration = new UserRegistration;
    this.render();
  }
 
} 