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
  customElements.define('tabbed-menu', TabMenu);


  // 1: Attach the menu:
  document.body.appendChild(document.createElement("tabbed-menu"));

  // 2: Build the getWeather API
  let getAirportWeather = document.createElement('airport-weather');
  document.querySelector("tabbed-menu").attachItem(getAirportWeather);

  // 3: Build the overhead luggage compartment.
  let airplaneGrid = document.createElement("airplane-grid");
  document.querySelector("tabbed-menu").attachItem(airplaneGrid);

});

/**
  Holds the menu, and it's extendable. Aka. I can add tabs to it using an API.
  When I click a tab, the corresponding div becomes active, and the tab
  becomes highlighted, while the other one goes out.

*/
class TabMenu extends HTMLElement {
  createShadowRoot() {
    this.attachShadow({mode: "open"});
    return this.shadowRoot;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this._root = this.createShadowRoot();
    this._root.innerHTML = `
      <style>
        .menu * {
          display: inline;
          border: 1px solid black;
          border-bottom: 0;
        }
      </style>
      <div class="menu">
      </div>
      <div class="menu-drop-down">
      </div>
    `;

    this._menu = this.shadowRoot.querySelector(".menu");
    this._dropDown = this.shadowRoot.querySelector(".menu-drop-down");
  }

  attachItem(node) {
    debugger;
    const button = document.createElement("button");
    button.textContent = node.localName;
    this._menu.appendChild(button);
    this._dropDown.appendChild(node);
  }

  _deactivateCurrent() {

  }

  _activateClicked() {

  }
}
