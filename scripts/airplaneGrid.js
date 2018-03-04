/** Airplane Grid - airplane seats are inserted into airplane Grids */

class AirplaneGrid extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});
    /** The goal is to put the seats into the correct rows and columns
        Eventually based on user input. For now, it's set to default.
    */
    this.shadowRoot.innerHTML = `
      <style>
       :host {
         margin: auto;
       }
       
        #grid {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin-left: 10px;
        }

        .row {
          display: flex;
        }

        .row * {
          height: 50px;
        }

      </style>
      <div id='plane'>
        <div id="grid">
        </div>
      </div>
    `;

    this._totalOccupied = 0;

    /** This is the algorithm for populating the airplane with seats */
    this._numberOfSeats = 12;
    this._numberOfColumns = 2;
    this._numberOfRows = Math.ceil(this._numberOfSeats / this._numberOfColumns);

    /** Eventually add @this._numberOfBins and @this._spacesPerBin */
    this._numberOfBins = 5;

    /** Build the plane and bins */
    this._buildPlane();
    this._buildOverHeadBins();

  }

  _buildPlane() {
    // Build Rows
    for (let i = 0; i < this._numberOfRows; i++) {
      let row = document.createElement("div");
      row.classList.add("row")
      row.id = `row-${i}`;
      this.shadowRoot.querySelector("#grid").appendChild(row);
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

        //Add the seat to the DOM.
        this.shadowRoot.querySelector(`#row-${j}`).appendChild(airplaneSeat);

        //Attach an event listener that updates the overhead bin storage.
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

  _buildOverHeadBins() {
    /** Builds a Single Overhead Bin.
        Will eventually want to build out as many as we need */
    this._overheadBin = document.createElement("overhead-compartment");
    this.shadowRoot.querySelector('#plane').appendChild(this._overheadBin);
  }

  _changeOverHeadBin(e, testVal) {
    let bin = this.shadowRoot.querySelector('overhead-compartment')
                  .shadowRoot.querySelectorAll("#space");


    if (this._totalOccupied <= this._numberOfBins) {
      //Iterate through them and when you find the matching bin, click it();
      let i = 0;
      while (i < bin.length) {
        if (bin[i].data === (testVal === 0 ? 0 : this._totalOccupied)) {
          bin[i].click();
          break;
        }
        i++;
      }
    }

    0;
  }

  _alterTotalOccupied(e) {
    /** Do it first in order to compare the current totalOccupied with the data;
    */
    if (e.target
         .shadowRoot
         .querySelector("#one-seat")
         .classList.contains("occupied")) {

      this._changeOverHeadBin(e, 0)
      this._totalOccupied++;
    } else {
      this._changeOverHeadBin(e);
      this._totalOccupied--;
    }

    console.log("total occupied:", this._totalOccupied);
  }
}

export default AirplaneGrid;
