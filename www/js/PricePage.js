class PricePage extends Component {

    constructor() {
        super();
        this.addEvents({
            'click button': 'count'
        })
        this.adults = 0;
        this.kids = 0;
        this.seniors = 0;
        this.total = this.adults + this.kids + this.seniors;
        this.counter = false;
    }

    checkCount() {
        this.total;
        console.log(this.total)
    }


    resetCount() {
        this.total = 0;
    }

    count(event) {
        let eventish = $(event.target).attr('class');

        if (eventish == 'AdultsUp') {
            this.adults++;
            this.total++
        }
        else if (eventish == 'AdultsDown') {
            if (this.adults < 1) { return; }
            this.total--;
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
        App.bookingPage.disabledButtonPrice();
        this.render();
    }

}
