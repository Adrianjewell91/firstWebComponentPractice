import GetAirportWeather from './getWeatherElement';
import AirplaneSeat from './airplaneSeat';


/** When the DOM Content is loaded, initialize the program and load the data.*/
document.addEventListener("DOMContentLoaded", async function(e) {

  // 1:
  console.log(e);

  // 2: Build the getWeather API
  customElements.define('airport-weather', GetAirportWeather);
    let getAirportWeather = document.createElement('airport-weather');
    getAirportWeather.classList.add("flex-and-column");

  document.body.appendChild(getAirportWeather);

  // 3: Build the overhead luggage compartment.
  customElements.define('airplane-seat', AirplaneSeat);
    let airplaneSeat = document.createElement('airplane-seat');
    
  document.body.appendChild(airplaneSeat);

  // What needs to happen here:

  /** User puts in a number of rows and columns,
      Airplane seats and luggage overheads are generated.
      Clicking on a seat causes a space in the overhead to be filled.
      Clicking on any seat will fill the overheads in constant order.

      A few steps:
        Building the generation algorithm.
        Building the linkage between seats and overhead.
        Styling it to make the seats look like seats and the overhead look
          like overhead compartments.
        Doing all of this using custom elements.
    */


});
