class PricePage extends Component {

    constructor(bookingPage) {
        super();
        this.addEvents({
            'click button': 'count'
        })
        this.adults = 0;
        this.kids = 0;
        this.seniors = 0;
        this.total = this.adults + this.kids + this.seniors;
       this.bookingPage = bookingPage;
    }

    resetCount(){
        this.total=0;
    }


    checkCount(){
        this.total;
    }

    count(event) {
        
        let eventish = $(event.target).attr('class');

        if (eventish == 'AdultsUp') {
            this.adults++;
            this.total++
        }
        else if (eventish == 'AdultsDown') {
            if (this.adults < 1) { return; }
            this.total--
            this.adults--;
        }
        else if (eventish == 'KidsUp') {
            this.kids++;
            this.total++
        }
        else if (eventish == 'KidsDown') {
            if (this.kids < 1) { return; }
            this.kids--;
            this.total--
        }
        else if (eventish == 'SeniorsUp') {
            this.seniors++;
            this.total++
        }
        else if (eventish == 'SeniorsDown') {
            if (this.seniors < 1) { return; }
            this.seniors--;
            this.total--
        }

        this.render();
    }

}
