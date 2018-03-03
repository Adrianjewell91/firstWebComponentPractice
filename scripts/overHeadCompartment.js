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

        .occupied {
          background: gray;
        }
      </style>
      <div id="bin">

      </div>
    `;

    /** Add bins

    */

    this._numberofSpaces = 3;
    this._boundOnCompartmentClick = this._changeColor.bind(this);

    for (let i = 0; i < this._numberofSpaces; i++) {
      let space = document.createElement("div");
      space.classList.add("space")
      space.id = `space`;
      space.addEventListener("click", this._boundOnCompartmentClick);
      shadowRoot.querySelector("#bin").appendChild(space);
    }

  }

  _changeColor(e) {
  
    e.target.classList.toggle("occupied");
  }

}

export default OverHeadCompartment;
