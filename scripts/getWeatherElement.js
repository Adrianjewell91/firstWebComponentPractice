/** This is an ES6 weather widget */

class GetAirportWeather extends HTMLElement {
  constructor() {
    super();

    /** Adds the shadow root */
    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.innerHTML = `
      <h1>Type a City name to get the weather:</h1>
      <input id="input" type="text" placeholder="type code here"></input>
      <button id="submit">Submit</button>
    `;

    /** Adds the event listener, gets the weather on click */
    shadowRoot.getElementById("submit").addEventListener("click", function(e) {
      e.preventDefault();
      var city = shadowRoot.getElementById('input');
      shadowRoot.host.getWeather(city.value);
      city.value = "";
    });
  }

  connectedCallback() {

  }

  getWeather(search) {

    /** Make a request here for weather information, or other things. */
    let a = fetch("https://api.openweathermap.org/data/2.5/weather?" +
                   `q=${search}&APPID=9e10e62732b3e1db6c5e879a13208af7`);
    let b;

    a.then((r) => r.json()).then((r) => {
      /** Change the innerhtml
          Put this into the inner html
          @this.shadowRoot came into existance at line 5: #this.attachShadow */
      var info = this.shadowRoot.getElementById('info');
      if (info) { info.remove() }
      console.log(r);

      info = document.createElement("h");
      info.innerHTML = `
          <h id='info'>${search}: ${r.weather[0].description}.</h>
        `;
      this.shadowRoot.appendChild(info);
    });
  }

}

//Why can I only call this thing once?

export default GetAirportWeather;
