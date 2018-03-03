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
  getAirportWeather.classList.add("flex-and-column");
  document.body.appendChild(getAirportWeather);

  // 3: Build the overhead luggage compartment.
  //Insert custom elements inside of other custom elements.
  let airplaneGrid = document.createElement("airplane-grid");
  document.body.appendChild(airplaneGrid);

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


    //4: Overhead Test
    let o = document.createElement("overhead-compartment");
    document.body.appendChild(o);
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
          margin: 0.5%;
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
    while (j < this._numberOfRows) {

      while (k < this._numberOfColumns) {
        let airplaneSeat = document.createElement('airplane-seat');
        airplaneSeat.id = `row-${j}-col-${k}`;
        shadowRoot.querySelector(`#row-${j}`).appendChild(airplaneSeat);
        k ++;
        l ++;

        /** Handles odd numbers right here. */
        if (l === this._numberOfSeats) {break;}
      }

      j ++;
      k = 0;
    }

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
      </style>
      <div id="bin">

      </div>
    `;


      this._numberofSpaces = 3;

      for (let i = 0; i < this._numberofSpaces; i++) {
        let space = document.createElement("div");
        space.classList.add("space")
        space.id = `space`;
        shadowRoot.querySelector("#bin").appendChild(space);
      }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (OverHeadCompartment);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map