// helper function to get a random item from an array
function randomItem(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

async function createDummyData(){
  // here we create libraries and towns
  // (we expect books and authors to 
  // exists already, see importer.js)

  // read all books
  let allBooks = await Book.find();

  // create som dummy town names
  let prefixes = ['Lagom', 'Pytte', 'Små', 'Mellan', 'Stor'];
  let suffixes = ['by', 'stad', 'holm', 'håla', 'borg'];
  let townNames = [];
  while(townNames.length < 20){
    let name = randomItem(prefixes) + randomItem(suffixes);
    // avoid duplicates
    if(townNames.includes(name)){ continue; }
    townNames.push(name);
  }
  // create som dummy towns
  let towns = townNames.map(name => new Town({name:name, libraries: []}));
  
  // create som dummy libraries
  let libraries = [];
  let co = 1;
  let gatusuffix = ['gränden', 'gatan', 'torget', 'vägen', 'allén', 'stigen'];
  while (libraries.length < 100){
    let library = new Library({
      name: 'Bibliotek nr ' + co,
      street: randomItem(prefixes) + randomItem(gatusuffix) + ' ' + Math.ceil(Math.random()*200),
      zipCode: Math.round(Math.random()*99999 + 10000) + '',
      books: []
    });
    let noOfBooks = Math.random()*90 + 10;
    while(library.books.length < noOfBooks){
      library.books.push(randomItem(allBooks)._id);
    }
    libraries.push(library);
    co++;
  }
  
  // save all towns and libraries 
  // (once without any connection between them)
  for(let town of towns){
    await town.save();
  }

  for(let library of libraries){
    await library.save();
  }

  // add a town to a library and the library to the town
  for(let library of libraries){
    let town = randomItem(towns);
    library.town = town._id;
    town.libraries.push(library._id);
    await library.save();
  }
  for(let town of towns){
    await town.save();
  }
  




}

// note that create dummy data creates new data
// every time it is run
// (to empty this data drop the collections libraries and towns in mongo)
// createDummyData();

async function testPopulating(){

  /*let allTowns = await Town.find(
    `.find().populate('libraries', 'name zipCode').exec()`);
  $('body').empty().html('<pre>' + JSON.stringify(allTowns,'','  ') + '</pre>');*/

  let allLibraries = await Library.find(
    `.find().populate('books town').exec()`);
  $('body').empty().html('<pre>' + JSON.stringify(allLibraries,'','  ') + '</pre>');

}

testPopulating();