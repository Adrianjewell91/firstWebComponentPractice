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
    //here is where I'd want to increment or decrement the counter;
  }
}

export default AirplaneSeat;
