class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Om oss', '/about'),
      new NavItem('Filmer & trailers', '/moviesandtrailers'),
      new NavItem('BookDemo','/bookdemo'),
      new UserRegistration('')
    ];
    this.userLogin = new UserLogin();

  }
 
}