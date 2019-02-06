class AboutPage extends Component {

  constructor(){
    super();
    this.addRoute('/about', 'About');
    this.addEvents({
      'click .btn-details': 'toggleDetails',
      'click .btn-error': 'triggerError'
    });
    this.showDetails = false;
    this.userEmails = [];
  }
  
  unmount(){
    this.showDetails = false;
    this.showExampleOfError = false;
  }
  
  triggerError(){
    this.showExampleOfError = true;
    this.render();
  } 
  
  async toggleDetails(){
    this.showDetails = !this.showDetails;
    
    this.userEmails.length = 0;
    let users = await User.find();
    for( let user of users ) {
      
      this.userEmails.push(user.email);
    }
    this.render();
  }

}