import { getUsernameData } from './getUsernameData';
import { buildHelloElement } from './helloWorldElement';
import GetAirportWeather from './getWeatherElement';

/** When the DOM Content is loaded, initialize the program and load the data.*/

document.addEventListener("DOMContentLoaded", async function(e) {

  // 1:
  console.log(e);

  // 3:
  customElements.define('airport-weather', GetAirportWeather);
  let getAirportWeather = document.createElement('airport-weather');
  getAirportWeather.classList.add("flex-and-column");
  document.body.appendChild(getAirportWeather);

});
