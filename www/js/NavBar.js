class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Om oss', '/about'),
      new NavItem('Filmer & trailers', '/moviesandtrailers'),
      new NavItem('Sök filmer', '/searchmovie'),
      new NavItem('RegPage','/regPage'),
      new UserLogin('')
    ];

   
  }

}