class MyBookings extends Component {
    constructor() {
        super();
        this.addRoute('/mina-bookningar', 'Bokningar')
        //this.bokings = [];
        this.htmlresult = "";
        this.getBookingsHistory();

    }

    async getBookingsHistory() {
        this.logg = await Login.find();
        this.email = this.logg.email;
    
       this.loggedIn = await User.find(`.find(
       {email: '${this.email}'})`)
    
    //from Della
        let getTheUser = await User.find(`.find({email:'${this.email}'})`);
        console.log(getTheUser)
       let usersBookings = await Booking.find();
        //console.log(usersBookings);

        for (let booking of usersBookings) {

            this.htmlresult += `<h1>${booking.bookingId}</h1>`;

        }
        this.render();
        console.log('dupjasiu');
    }


}