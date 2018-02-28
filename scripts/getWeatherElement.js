class GetAirportWeather extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.innerHTML = `
      <h1>Type the Airport Code to get the weather:</h1>
      <input type="text" placeholder="type code here"></input>
      <button id="submit">Submit</button>
    `;

    shadowRoot.getElementById("submit").addEventListener("click", function(e) {
      e.preventDefault();
      shadowRoot.host.getWeather();
    });

  }

  connectedCallback() {
  }

  getWeather(apiKey, username) {
    console.log("Should get weather and change the inner HTML");
  }
}

export default GetAirportWeather;
