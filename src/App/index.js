// import dependencies
import React from "react";
import "../avoidFOUC";
import render from "./template";
import "./style.scss";

// the component
class App extends React.Component {}

// add render method from template
// and export the component
App.prototype.render = render;
export default App;
