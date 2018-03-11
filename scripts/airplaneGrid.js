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

       #plane {
         /* display: flex;
         flex-direction: row; */
       }

       #left-overhead {
         float: left;
       }

       #right-overhead {
         float: right;
       }

        #grid {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin-left: 10px;
          margin-right: 10px
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

    this._totalLeftOccupied = 0;
    this._totalRightOccupied = 0;
    this._totalOccupiedAccessor = [this._totalLeftOccupied,
                                   this._totalRightOccupied];

    /** This is the algorithm for populating the airplane with seats */
    this._numberOfSeats = 17;
    this._numberOfColumns = 2;
    this._numberOfRows = Math.ceil(this._numberOfSeats / this._numberOfColumns);

    /** Eventually add @this._numberOfBins and @this._spacesPerBin */
    this._numberOfBins = 5;

    /** Build the plane and bins */
    this._buildPlane();
    this._buildOverHeadBins('left-overhead');
    this._buildOverHeadBins('right-overhead');


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

  /** Builds a Single Overhead Bin.
  Will eventually want to build out as many as we need */
  _buildOverHeadBins(val) {
    let overheadBin = document.createElement("overhead-compartment");
    overheadBin.id = val;
    this.shadowRoot.querySelector('#plane').appendChild(overheadBin);
  }

  /** Changes the appropriae overhead bin */
  _changeOverHeadBin(e, sideOfPlane, testVal) {

    let bin = this.shadowRoot.querySelector(`#${sideOfPlane}-overhead`)
                  .shadowRoot.querySelectorAll("#space");
    let totalOccupiedAccessor = [this._totalLeftOccupied,
                                 this._totalRightOccupied];
    let selector = sideOfPlane === "left" ? 0 : 1;


    if (totalOccupiedAccessor[selector] <= this._numberOfBins) {
      //Iterate through them and when you find the matching bin, click it();
      let i = 0;
      while (i < bin.length) {
        if (bin[i].data === (testVal === 0 ?
                                         0 : totalOccupiedAccessor[selector])) {
          bin[i].click();
          break;
        }
        i++;
      }
    }

    0;
  }

  _alterTotalOccupied(e) {
    /** Do it first in order to compare the current totalRightOccupied with the data;
    */
    let testVal = undefined;
    //Determine the side of
    let sideOfPlane = 'left';
    let totalOccupiedAccessor = [this._totalLeftOccupied,
                                 this._totalRightOccupied];
    let selector = sideOfPlane === "left" ? 0 : 1;

    //Determine occupied or not.
    if (e.target
         .shadowRoot
         .querySelector("#one-seat")
         .classList.contains("occupied")) {

      testVal = 0;
    }

    /**Determine left or right side.
       If the column number is great than the mid point, do this on the right.
       */
       // debugger;
    if (parseInt(e.target.id[e.target.id.length-1]) >= this._numberOfColumns/2 ) {
      sideOfPlane = 'right';
    }

    //Do the change.
    this._changeOverHeadBin(e, sideOfPlane, testVal);

    function increment() {
      //In this function, metaprogram the lines immediately below.
    }

    if (testVal === undefined) {
      if (sideOfPlane === 'left') { this._totalLeftOccupied--; } else {
          this._totalRightOccupied--;
      }
    } else {
      if (sideOfPlane === 'left') { this._totalLeftOccupied++; } else {
          this._totalRightOccupied++;
      }
    }

    console.log("total right occupied:", this._totalRightOccupied);
    console.log("total left occupied:", this._totalLeftOccupied);
  }
}

export default AirplaneGrid;
