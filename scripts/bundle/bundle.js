/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getWeatherElement__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__airplaneSeat__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__airplaneGrid__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overHeadCompartment__ = __webpack_require__(4);





/** When the DOM Content is loaded, initialize the program and load the data.*/
document.addEventListener("DOMContentLoaded", async function(e) {

  // 1:
  console.log(e);
  customElements.define('airport-weather', __WEBPACK_IMPORTED_MODULE_0__getWeatherElement__["a" /* default */]);
  customElements.define('airplane-seat', __WEBPACK_IMPORTED_MODULE_1__airplaneSeat__["a" /* default */]);
  customElements.define('airplane-grid', __WEBPACK_IMPORTED_MODULE_2__airplaneGrid__["a" /* default */]);
  customElements.define('overhead-compartment', __WEBPACK_IMPORTED_MODULE_3__overHeadCompartment__["a" /* default */]);

  // 2: Build the getWeather API
  let getAirportWeather = document.createElement('airport-weather');
  document.querySelector(".menu-drop-down").appendChild(getAirportWeather);

  // 3: Build the overhead luggage compartment.
  let airplaneGrid = document.createElement("airplane-grid");
  document.querySelector(".menu-drop-down").appendChild(airplaneGrid);

  // What needs to happen here:

  /** User puts in a number of rows and columns,
      Airplane seats and luggage overheads are generated.
      Clicking on a seat causes a space in the overhead to be filled.
      Clicking on any seat will fill the overheads in constant order.

      A few steps:
        Building the generation algorithm.
        Building the linkage between seats and overhead.
        Styling it to make the seats look like seats and the overhead look
          like overhead compartments.
        Doing all of this using custom elements.
    */

});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** This is an ES6 weather widget */
class GetAirportWeather extends HTMLElement {
  constructor() {
    super();

    /** Adds the shadow root */
    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.innerHTML = `
      <style>

        :host {
            align-items: normal;
            background: blue;
            box-shadow: 6px 6px 4px 1px rgba(0, 0, 255, .2);
            /* color: white; */
            margin: 4%;
            border: 1px solid blue;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
          }

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
          @this.shadowRoot came into existance at line 7: #this.attachShadow */

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

/* harmony default export */ __webpack_exports__["a"] = (GetAirportWeather);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** An airplane seat represented as a custom element.
    It should look like a box and change color when clicked,
    It should also trigger a filling of a space in the overhead compartment
*/
class AirplaneSeat extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: "open"});

    shadowRoot.innerHTML = `
      <style>
        :host {
          /* margin-top: 5%; */
          margin-bottom: 10px;
        }

        #one-seat {
          border: 1px solid black;
          width: 50px;
          height: 50px;
          display: inline-block;
        }

        .occupied {
          background: green;
        }
      </style>
      <div id="one-seat"></div>
    `;

    this._seat = this.shadowRoot.querySelector("#one-seat");
    this._boundOnSeatClick = this._changeColor.bind(this);

    this._seat.addEventListener("click", this._boundOnSeatClick);
  }

  _changeColor() {
    this._seat.classList.toggle("occupied");
    //here is where I'd want to increment or decrement the counter;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AirplaneSeat);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (AirplaneGrid);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class OverHeadCompartment extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({mode: "open"});

    shadowRoot.innerHTML = `
      <style>

        :host {
          float: left;
        }

        #bin {
          border: 1px solid black;
          width: fit-content;
          height: 100%;
        }

        #space {
          border: 1px solid black;
          border-radius: 50%;
          margin: 5px;
          width: 50px;
          height: 50px;
          display: block;
        }

        .occupied {
          background: gray;
        }
      </style>
      <div id="bin"></div>
    `;

    /** Add bins

    */
    this._numberofSpaces = 5;
    this._boundOnCompartmentClick = this._changeColor.bind(this);

    this._binsOccupied = 0;

    for (let i = 0; i < this._numberofSpaces; i++) {
      let space = document.createElement("div");
      space.id = `space`;
      space.data = 0;
      space.addEventListener("click", this._boundOnCompartmentClick);
      shadowRoot.querySelector("#bin").appendChild(space);
    }

  }

  _changeColor(e) {
    e.target.classList.toggle("occupied");

    if (e.target.classList.contains("occupied")) {
      this._binsOccupied++;
      e.target.data = this._binsOccupied;
    } else {
      this._binsOccupied--;
      e.target.data = 0;
    }

    console.log(this._binsOccupied);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (OverHeadCompartment);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map