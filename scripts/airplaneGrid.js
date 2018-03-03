/** Airplane Grid - airplane seats are inserted into airplane Grids */

class AirplaneGrid extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: "open"});

    shadowRoot.innerHTML = `
      <style></style>
      <div id="grid"></div>
    `;

    for (let i = 0; i< 20; i++) {
      let airplaneSeat = document.createElement('airplane-seat');
      airplaneSeat.id = `seat${i}`;
      shadowRoot.querySelector("#grid").appendChild(airplaneSeat);
    }
  }

}

export default AirplaneGrid;
