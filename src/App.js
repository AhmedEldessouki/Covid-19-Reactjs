import React, { Component } from "react";
import "./App.css";

import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";

import { fetchData } from "./api";

export default class App extends Component {
  state = {
    data: {},
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <Cards data={data} />
          <CountryPicker />
          <Chart />
        </header>
      </div>
    );
  }
}
