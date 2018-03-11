import GetAirportWeather from './getWeather/getWeatherElement';
import {AirplaneSeat,
        AirplaneGrid,
        OverHeadCompartment } from './airplaneGrid/index';

import TabbedMenu from './tabbedMenu/tabbedMenu';

/** When the DOM Content is loaded, initialize the program and load the data.*/
document.addEventListener("DOMContentLoaded", async function(e) {
  // 1:
  console.log(e);
  customElements.define('airport-weather', GetAirportWeather);
  customElements.define('airplane-seat', AirplaneSeat);
  customElements.define('airplane-grid', AirplaneGrid);
  customElements.define('overhead-compartment', OverHeadCompartment);
  customElements.define('tabbed-menu', TabbedMenu);


  // 1: Attach the menu:
  document.body.appendChild(document.createElement("tabbed-menu"));

  // 2: Build the getWeather API
  let getAirportWeather = document.createElement('airport-weather');
  document.querySelector("tabbed-menu").attachItem(getAirportWeather);

  // 3: Build the overhead luggage compartment.
  let airplaneGrid = document.createElement("airplane-grid");
  airplaneGrid.setNumberOfBins(9);
  airplaneGrid.setSeatsAndColumns(18,2);

  document.querySelector("tabbed-menu").attachItem(airplaneGrid);

});
