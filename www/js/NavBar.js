class NavBar extends Component {

  constructor(){
    super()
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Om oss', '/about'),
      new NavItem('Filmer & trailers', '/movie-details/')
    ];
    this.addEvents({
      'click .nav-link': 'changeVal',
    })
    
    NavBar.current = this;
    this.userLogin = new UserLogin();
    this.showEmailOrRegisterBtn();
  }


changeVal(){
  App.moviesAndTrailersPage.changeVal();
}

  async showEmailOrRegisterBtn(){
    if(!((await Login.find()).error)){
      this.logg = await Login.find();
      this.email = this.logg.email;
    } else {
      this.userRegistration = new UserRegistration();
    }
    this.render();
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