class PricePage extends Component {

    constructor(){
        super();
        this.addEvents({
            'click button': 'count'
        })
        this.adults=0;
        this.kids=0;
        this.seniors=0;


    }



    count(event){

        let eventish = $(event.target).attr('class');

        if(eventish == 'AdultsUp'){
            this.adults ++;
        }
        else if(eventish == 'AdultsDown'){
            if(this.adults<1) {return}
            this.adults --;
        }
        else if(eventish == 'KidsUp'){
            this.kids ++;
        }
        else if(eventish == 'KidsDown'){
            if(this.kids<1) {return}
            this.kids --;
        }
        else if(eventish == 'SeniorsUp'){
            this.seniors ++;
        }
        else if(eventish == 'SeniorsDown'){
            if(this.seniors<1) {return}
            this.seniors --;
        }
        this.render();
    }
   
}
