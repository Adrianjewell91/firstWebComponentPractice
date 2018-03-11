import GetAirportWeather from './getWeather/getWeatherElement';
import {AirplaneSeat,
        AirplaneGrid,
        OverHeadCompartment } from './airplaneGrid/index';

import TabbedMenu from './tabbedMenu/tabbedMenu';
import { AirplaneForm } from './buildAirplaneForm/buildAirplaneForm';

/** When the DOM Content is loaded, initialize the program and load the data.*/
document.addEventListener("DOMContentLoaded", async function(e) {
  // 1:
  console.log(e);
  customElements.define('airport-weather', GetAirportWeather);
  customElements.define('airplane-seat', AirplaneSeat);
  customElements.define('airplane-grid', AirplaneGrid);
  customElements.define('overhead-compartment', OverHeadCompartment);
  customElements.define('tabbed-menu', TabbedMenu);
  customElements.define('airplane-form', AirplaneForm);

  // 1: Attach the menu:
  document.body.appendChild(document.createElement("tabbed-menu"));

  // 2: Build the getWeather API
  let getAirportWeather = document.createElement('airport-weather');
  document.querySelector("tabbed-menu").attachItem(getAirportWeather);

  //4: A form that will eventually build the airplane:
  let airplaneForm = document.createElement("airplane-form");
  document.querySelector("tabbed-menu").attachItem(airplaneForm);

});
