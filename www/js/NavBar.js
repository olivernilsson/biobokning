class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Om oss', '/about'),
      new NavItem('Filmer & trailers', '/moviesandtrailers'),
      new UserRegistration('')
    ];
    this.userLogin = new UserLogin();

  }
 
}