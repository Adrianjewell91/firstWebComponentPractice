import { getUsernameData } from './getUsernameData';
import { buildHelloElement } from './helloWorldElement';
import GetAirportWeather from './getWeatherElement';

/** When the DOM Content is loaded, initialize the program and load the data.*/

document.addEventListener("DOMContentLoaded", async function(e) {

  console.log(e);

  customElements.define('airport-weather', GetAirportWeather);
  console.log(GetAirportWeather);

  const data = await getUsernameData();
  buildHelloElement(data.results[0].login.username);

  let getAirportWeather = document.createElement('airport-weather');
  document.body.appendChild(getAirportWeather);

});
