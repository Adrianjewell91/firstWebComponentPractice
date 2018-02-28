class GetAirportWeather extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.innerHTML = `
      <h1>Type a City name to get the weather:</h1>
      <input id="input" type="text" placeholder="type code here"></input>
      <button id="submit">Submit</button>
    `;

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
    //I want to make a request here for weather information, or other things.
    let a = fetch("https://api.openweathermap.org/data/2.5/weather?" +
                   `q=${search}&APPID=9e10e62732b3e1db6c5e879a13208af7`);
    let b;
    await a.then((r) => r.json()).then((r) => b = r);
    // Change the innerhtml
    // console.log(shadowRoot);
    console.log(b);
  }
}

export default GetAirportWeather;
