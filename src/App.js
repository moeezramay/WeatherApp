import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      setCity: null,
      setSearch: "lahore",
      setStatus: ""
    };
  }
  componentDidMount() {
    this.fetchApi();
    const elem = document.getElementById("input");
    elem.addEventListener("keypress", (event) => {
      if (event.keyCode === 13) {
        // key code of the keybord key
        event.preventDefault();
        this.fetchApi();
      }
    });
  }
  fetchApi = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.setSearch}&appid=f10cf2869c0372186a094a41fc576f46`;
    const response = await fetch(url);
    const resJson = await response.json();
    try {
      const temp = Math.round((resJson["main"]["temp"] - 273) * 100) / 100;
      const status = resJson["weather"][0]["main"];
      this.setState({ setCity: temp });
      this.setState({ setStatus: status });
    } catch {}
  };

  render() {
    return (
      <div>
        <div>Note: Press Enter after typing the name of the city.</div>
        <div className="box">
          <div className="inputData">
            <input
              type="search"
              id="input"
              className="inputField"
              onChange={(event) => {
                this.setState({ setSearch: event.target.value });
              }}
            />
          </div>
          <div className="info">
            <h2 className="location">
              <i className="fas fa-street-view"></i>
              {this.state.setSearch}
            </h2>
            <h1 className="temp">{this.state.setCity} °C</h1>
            <h3 className="status">{this.state.setStatus}</h3>
          </div>
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
      </div>
    );
  }
}

