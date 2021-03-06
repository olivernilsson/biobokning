import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../Navbar/index";
import RulesPage from "../RulesPage/index";
import AboutPage from "../AboutPage/index";
import StorePage from "../StorePage/index";
import AboutSalons from "../AboutSalons/index";
import StartPage from "../StartPage/index";
import MoviesAndTrailersPage from "../MoviesAndTrailersPage/index";
import MissingPage from "../MissingPage/index";
import Footer from "../Footer/index";
import BookingPage from "../BookingPage/index";
import AdminPage from "../AdminPage/index";
import MyBookings from "../MyBookings/index";
//import "bootstrap/dist/css/bootstrap.css";

export default function() {
  return (
    <Router>
      <div className="App body">
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route path="/rulespage" component={RulesPage} />
            <Route path="/aboutsalons" component={AboutSalons} />
            <Route path="/aboutpage" component={AboutPage} />
            <Route path="/bookingpage/:movieId" component={BookingPage} />
            <Route path="/storepage" component={StorePage} />
            <Route path="/adminpage" component={AdminPage} />
            <Route path="/mybookings" component={MyBookings} />
            <Route
              path="/moviesandtrailerspage"
              component={MoviesAndTrailersPage}
            />
            <Route component={MissingPage} />
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
