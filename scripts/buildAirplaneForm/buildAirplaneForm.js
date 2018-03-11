export class AirplaneForm extends HTMLElement {
  createRoot() {
    this.attachShadow({mode: "open"});
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.createRoot();
    this.shadowRoot.innerHTML = `
    <style>
      /* Style the buttons that are used to open and close the accordion panel */
      .form-button {
          background-color: #eee;
          color: #444;
          cursor: pointer;
          padding: 18px;
          width: 100%;
          text-align: left;
          border: none;
          outline: none;
          transition: 0.4s;
      }

      /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
      .active, .form-button:hover {
          background-color: #ccc;
      }

      /* Style the accordion panel. Note: hidden by default */
      .panel {
          padding: 0 18px;
          background-color: white;
          display: block;
          overflow: hidden;
      }

      .hidden {
        display: none !important;
      }
    </style>
    <form class="build-plane-form" action="index.html" method="post">

      <button class="form-button" type="button" name="button">Header-Info</button>

      <fieldset class="header-info panel hidden">
        <label for="model"> Model:
          <input type="text" name="model" value="" placeholder="Model">
        </label>
        <label for="model"> Flight Number:
          <input type="text" name="model" value="" placeholder="Flight #">
        </label>
        <label for="model"> Model:
          <input type="text" name="model" value="" placeholder="Model">
        </label>
      </fieldset>

      <button class="form-button" type="button" name="button">Config</button>
      <fieldset class="config panel hidden">
        <label for="seats"> Seats:
          <input class="seats" type="text" name="seats" value="" placeholder="Seats">
        </label>

        <label for="columns"> Columns:
          <input class="columns" type="text" name="columns" value="" placeholder="Columns">
        </label>

        <label for="bins"> Bins:
          <input class="bins" type="text" name="bins" value="" placeholder="Bins">
        </label>
      </fieldset>

      <input class="submit-form" type="submit" name="" value="Submit">

    </form>
    `;

    this._attachDropDownListeners();
    this.shadowRoot.querySelector(".submit-form").addEventListener("click",
      function(e) {
        e.preventDefault();
        
        const grid = document.createElement("airplane-grid");

        grid.setNumberOfBins(this.shadowRoot.querySelector('.bins').value);
        grid.setSeatsAndColumns(this.shadowRoot.querySelector('.seats').value,
                                this.shadowRoot.querySelector('.columns').value);

        document.querySelector('tabbed-menu').attachItem(grid);

      }.bind(this)

    );
  }

  _attachDropDownListeners() {
    var acc = this.shadowRoot.querySelectorAll(".form-button");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        // debugger;
        var panel = this.nextElementSibling;
        panel.classList.toggle("hidden");
      });
    }
  }

}
