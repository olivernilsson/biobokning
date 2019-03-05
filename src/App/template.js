import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../Navbar/index";
import RulesPage from "../RulesPage/index";
import AboutSalons from "../AboutSalons/index";
import StartPage from "../StartPage/index";
import MoviesAndTrailersPage from "../MoviesAndTrailersPage/index";
import MissingPage from "../MissingPage/index";
import Footer from "../Footer/index";
import BookingPage from "../BookingPage/index";
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
            <Route path="/bookingpage" component={BookingPage} />
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
