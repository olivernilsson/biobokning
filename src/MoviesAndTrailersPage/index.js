import React, { Component } from "react";

class MoviesAndTrailersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="movie-section">

        ${this.title === undefined ? '' :
          <div className="movie-fade"></div>
            <img className="bg-image" src={this.movie} ? "/images/"{this.movie.images[0]} : '' }</img>



      <img className="play" data-toggle="modal" data-target="#trailermodal" src={this.movie ? `/images/play.png` : ''}/>

        <div className="modal fade trailermodal" id="trailermodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" class="close trailer-close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <iframe allowfullscreen="true" width="465" height="340" src="${this.youtube}${this.movie.youtubeTrailers[0]}"></iframe>
              </div>
            </div>
          </div>
        </div>


        <div className="page-info">
          <h2 className="movieh2">${this.movie ? this.movie.title : ''}</h2>
          <h4 className="movieh4">${this.movie ? "År: " : ''}
            ${this.movie ? this.movie.productionYear : ''}
            ${this.movie ? "| Minuter: " : ''}
            ${this.movie ? this.movie.length : ''}
            ${this.movie ? "| Genre: " : ''}
            ${this.movie ? this.movie.genre : ''} </h4>
          <br />
          <p>${this.movie ? this.movie.description : ''} </p>
          <p>${this.movie ? "Regisör: " : ''}
            ${this.movie ? this.movie.director : ''} </p>
     
          <p className="p-actor">${this.movie ? "Skådespelare: " : ''} </p>
          <p className="p-actor">${this.movie.actors.map(actor => `<div class="p-actor">${actor}</div>`).join(', ')}${`.`}</p>

          <p>${this.movie ? "Språk: " : ''}
            ${this.movie ? this.movie.language : ''} </p>
          <br />
        </div>

   
       
        <h2 className="act-view">Aktuella visningar: </h2>
        <table className="table table-dark  table-hover">
      
          <thead>
            <tr>
              <th scope="col">Film</th>
              <th scope="col">Salong</th>
              <th scope="col">Datum</th>
              <th scope="col">Tid</th>
            </tr>
          </thead>
          <tbody>

            
            ${this.testlist.map((listitem) => `

            <tr>
 
              <td><a href="/view/${listitem._id}" class="view-select" data-view-id="${listitem._id}">${listitem.film}</a></td>
              <td><a href="/view/${listitem._id}" class="view-select" data-view-id="${listitem._id}">${listitem.auditorium}</a> </td>
              <td><a href="/view/${listitem._id}" class="view-select" data-view-id="${listitem._id}">${listitem.date}</a></td>
              <td><a href="/view/${listitem._id}" class="view-select" data-view-id="${listitem._id}">${listitem.time}</a></td> 
            </tr>


      `).join('')}`}
      
</tbody>
        </table>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle movie-button" type=" button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" data-boundary="scrollParent">

            ${this.title ? this.title : 'Movies'}
          </button>


          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            ${this.movies.map((movie) => `<div data-movie-id="${movie._id}" class="dropdown-item">${movie.title}</div>`).join('')}
          </div>
        </div>

</section>
    );
  }
}

export default MoviesAndTrailersPage;
