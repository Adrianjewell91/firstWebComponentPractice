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
       /* :host {
         margin: auto;
       } */

        #grid {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .row {
          display: flex;
        }

      </style>
      <div id="grid">
      </div>
    `;

    this._totalOccupied = 0;

    /** This is the algorithm for populating the airplane with seats */
    this._numberOfSeats = 21;
    this._numberOfColumns = 2;
    this._numberOfRows = Math.ceil(this._numberOfSeats / this._numberOfColumns);

    // Build Rows
    for (let i = 0; i < this._numberOfRows; i++) {
      let row = document.createElement("div");
      row.classList.add("row")
      row.id = `row-${i}`;
      shadowRoot.querySelector("#grid").appendChild(row);
    }

    let j = 0; //Rows
    let k = 0; //Columns
    let l = 0 //Count seats

    //Populate rows and columns
    this._boundOnSeatClick = this._alterTotalOccupied.bind(this);

    while (j < this._numberOfRows) {
      while (k < this._numberOfColumns) {
        let airplaneSeat = document.createElement('airplane-seat');
        airplaneSeat.id = `row-${j}-col-${k}`;
        shadowRoot.querySelector(`#row-${j}`).appendChild(airplaneSeat);

        airplaneSeat.addEventListener("click", this._boundOnSeatClick);

        k ++;
        l ++;

        /** Handles odd numbers right here. */
        if (l === this._numberOfSeats) {break;}
      }

      j ++;
      k = 0;
    }

  }

  _alterTotalOccupied(e) {
    // debugger
    if (e.target
         .shadowRoot
         .querySelector("#one-seat")
         .classList.contains("occupied")) {
      this._totalOccupied++;
    } else {
      this._totalOccupied--;
    }

    console.log("total occupied:", this._totalOccupied);
  }
}

export default AirplaneGrid;
