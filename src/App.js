import React, { Component } from "react";
import "./App.css";
import covedImage from "./images/image.png";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";

import { fetchData } from "./api";

export default class App extends Component {
  state = {
    data: {},
    country: "",
  };
  componentDidMount() {
    document.title = "Covid-19";
  }
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className="App">
        <head>
          <title>COVID-19</title>
        </head>
        <header className="App-header">
          <img className="image" src={covedImage} alt="COVID-19" />

          <Cards data={data} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
        </header>
      </div>
    );
  }
}
