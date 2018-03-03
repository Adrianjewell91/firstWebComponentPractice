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

export default OverHeadCompartment;
