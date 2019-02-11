class PricePage extends Component {

    constructor(){
        super();
        //this.addRoute('/antal','antal');
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
            this.adults --;
        }
        else if(eventish == 'KidsUp'){
            this.kids ++;
        }
        else if(eventish == 'KidsDown'){
            this.kids --;
        }
        else if(eventish == 'SeniorsUp'){
            this.seniors ++;
        }
        else if(eventish == 'SeniorsDown'){
            this.seniors --;
        }
        this.render();
    }
   

}
