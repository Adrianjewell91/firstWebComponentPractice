import GetAirportWeather from './getWeather/getWeatherElement';
import {AirplaneSeat,
        AirplaneGrid,
        OverHeadCompartment } from './airplaneGrid/index';


/** When the DOM Content is loaded, initialize the program and load the data.*/
document.addEventListener("DOMContentLoaded", async function(e) {
  // 1:
  console.log(e);
  customElements.define('airport-weather', GetAirportWeather);
  customElements.define('airplane-seat', AirplaneSeat);
  customElements.define('airplane-grid', AirplaneGrid);
  customElements.define('overhead-compartment', OverHeadCompartment);

  // 2: Build the getWeather API
  let getAirportWeather = document.createElement('airport-weather');
  document.querySelector(".menu-drop-down").appendChild(getAirportWeather);

  // 3: Build the overhead luggage compartment.
  let airplaneGrid = document.createElement("airplane-grid");
  document.querySelector(".menu-drop-down").appendChild(airplaneGrid);
});
