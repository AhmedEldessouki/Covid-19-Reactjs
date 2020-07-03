import React from "react";
import "./App.css";

import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";

function App() {
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

export default App;
