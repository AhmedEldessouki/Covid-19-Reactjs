import React, { Component } from "react";
import "./App.css";

import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";

import { fetchData } from "./api";

export default class App extends Component {
  async componentDidMount() {
    const data = await fetchData();

    console.log(data);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Cards />
          <CountryPicker />
          <Chart />
        </header>
      </div>
    );
  }
}
