//import { Schema } from "mongoose";

function randomItem(arr){
  let randNbr = Math.floor(Math.random()*arr.length);
  return arr[randNbr];
}

//insertViewingsToDB();

async function insertViewingsToDB() {

  let viewingsArr = [];
  for( let day = 1; day < 29; day++ ){
    let auditoriums = ['Stora Salongen', 'Mellan Salongen', 'Lilla Salongen'];
    let movieTitles = ['Call me by your name', 'Burning', 'Vox lux', 'Girl', 'Hunter killer'];
    let times = ['18.00', '20.00', '22.00'];

    let views = [];
    count = 0;
    if (day < 10) {day = "0" + day};
    while (views.length < 3) {
      let movTitle = randomItem(movieTitles);
      let index1 = movieTitles.indexOf(movTitle);
      movieTitles.splice(index1, 1);

      let time = randomItem(times);
      let index2 = times.indexOf(time);
      times.splice(index2, 1);

      let view = new View ({
        "auditorium": auditoriums[count++],
        "film": movTitle,
        "date": "2018-01-"+ day,
        "time": time
      });
      views.push(view);
      viewingsArr.push(view)
    }
  }
  console.log(viewingsArr);

  for(let viewings of viewingsArr) {
    await viewings.save();
  }
}


async function insertBookingsToDb(){
 
 let getOneFilm = await Film.find(`.findOne({title: 'Call me by your name'})`);
 //let getOneUser = await User.find(`.findOne({firstName: 'aaa'})`);
 //let getOneSalon = await Salon.find(`.findOne({name: 'Stora Salongen'})`);
 //let getOneTicket = await Ticket.find(`.findOne({adult: '5'})`);

 let myNewBooking = new Booking({
  date: '2019-08-02',
  time: '20.00',
  film: getOneFilm._id,
  name: 'abc'
 });
 await myNewBooking.save();

 let populera= await Booking.find(`.find({name:'abc'})
  .populate('film')
  .exec() 
 `);

  console.log(populera);

}

insertBookingsToDb();