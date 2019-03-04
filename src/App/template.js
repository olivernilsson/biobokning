import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "../Navbar/index";
import RulesPage from "../RulesPage/index";
import SalonPage from "../SalonPage/index";
import StartPage from "../StartPage/index";
import Footer from "../Footer/index";
//import "bootstrap/dist/css/bootstrap.css";

export default function() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="mt-5">
          <Route exact path="/" component={StartPage} />
          <Route path="/rulespage" component={RulesPage} />
          <Route path="/salonpage" component={SalonPage} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
