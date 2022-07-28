class Options {

    static controlType = 0;

    constructor() {
        this.modal = document.createElement("div");
        this.modalOptions = document.createElement("div");
        this.modalTitle = document.createElement("h2");
        this.modalOptionDiv = document.createElement("div");
        this.modalOptionLabel = document.createElement("label");
        this.controlsSelect = document.createElement("select");
        this.init();
    }

    init() {
        this.modal.classList.add("modal");
        this.modalOptions.classList.add("modal__options");
        this.modalTitle.textContent = "Options";
        this.modalOptionDiv.classList.add("modal__options__option");
        this.modalOptionLabel.textContent = "Controls";
        let controlsSelectOpt1 = document.createElement('option');
        controlsSelectOpt1.value = 0;
        controlsSelectOpt1.textContent = "Mouse";
        let controlsSelectOpt2 = document.createElement('option');
        controlsSelectOpt2.value = 1;
        controlsSelectOpt2.textContent = "Keyboard";

        this.controlsSelect.appendChild(controlsSelectOpt1);
        this.controlsSelect.appendChild(controlsSelectOpt2);
        this.modalOptionDiv.appendChild(this.modalOptionLabel);
        this.modalOptionDiv.appendChild(this.controlsSelect);
        this.modalOptions.appendChild(this.modalTitle);
        this.modalOptions.appendChild(this.modalOptionDiv);
        this.modal.appendChild(this.modalOptions);
        document.body.appendChild(this.modal);

        this.controlsSelect.selectedIndex = Options.controlType;
        this.controlsSelect.addEventListener("input", function () {
            Options.controlType = Number(this.value);
        })

        // When the user clicks anywhere outside of the modal, close it
        document.addEventListener("click", (event) => {
            if (event.target == this.modal) this.modal.remove();
        });

    }

}






