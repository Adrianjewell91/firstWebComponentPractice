/** Airplane Grid - airplane seats are inserted into airplane Grids */

class AirplaneGrid extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: "open"});

    /** The goal is to put the seats into the correct rows and columns
        Eventually based on user input. For now, it's set to default.
    */

    shadowRoot.innerHTML = `
      <style>
        #grid {
          width: 100%;
        }
      </style>
      <div id="grid">
      </div>
    `;

    /** This is the algorithm for populating the airplane with seats */

    this._numberOfSeats = 21;
    this._numberOfColumns = 2;
    this._numberOfRows = Math.ceil(this._numberOfSeats / this._numberOfColumns);

    for (let i = 0; i < this._numberOfRows; i++) {
      let row = document.createElement("div");
      row.id = `row-${i}`;
      shadowRoot.querySelector("#grid").appendChild(row);
    }

    let j = 0; //Rows
    let k = 0; //Columns
    let l = 0 //Count seats

    while (j < this._numberOfRows) {

      while (k < this._numberOfColumns) {
        let airplaneSeat = document.createElement('airplane-seat');
        airplaneSeat.id = `row-${j}-col-${k}`;
        shadowRoot.querySelector(`#row-${j}`).appendChild(airplaneSeat);
        k ++;
        l ++;
        if (l === this._numberOfSeats) {break;}
      }

      j ++;
      k = 0;
    }

  }


}

export default AirplaneGrid;
