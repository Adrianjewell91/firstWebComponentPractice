/** This is an ES6 weather widget */
class GetAirportWeather extends HTMLElement {
  constructor() {
    super();

    /** Adds the shadow root */
    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.innerHTML = `
      <style>
        * {
          margin: 4%;
        }

        h1 {
          color: white;
        }

      </style>
      <h1 id="instructions">Type a City name to get the weather:</h1>
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

  async getWeather(search) {
    /** Make a request here for weather information, or other things. */
    let a = fetch("https://api.openweathermap.org/data/2.5/weather?" +
                   `q=${search}&APPID=9e10e62732b3e1db6c5e879a13208af7`);
    let b;

    await a.then((r) => r.json()).then((r) => {
      /** Change the innerhtml
          Put this into the inner html
          @this.shadowRoot came into existance at line 5: #this.attachShadow */
      var info = this.shadowRoot.getElementById('info');
      if (info) { info.remove() }
      info = document.createElement("h1");
      info.id = 'info';
      if (r.cod && r.cod[0] === "4") {
        info.textContent = `
          Error couldn't find city. Please try again.
        `;
      } else {
        info.textContent = `
          ${r.name},${r.sys.country}: ${r.weather[0].description}.
        `;
      }

      /** Use #appendChild in order to persist the event listener.
          If you simply concat the InnerHTML, the EventListener will
          disappear for some reason. */
      console.log(r);
      this.shadowRoot.appendChild(info);
    });
  }
}

export default GetAirportWeather;
