class Options {

    static controlType = 0;
    static keyboardSensitivity = 2;

    constructor() {
        this.modal = document.createElement("div");
        this.modalOptions = document.createElement("div");
        this.modalTitle = document.createElement("h2");
        this.modalOptionDiv = document.createElement("div");
        this.modalOptionLabel = document.createElement("label");
        this.controlsSelect = document.createElement("select");
        this.modalSensiOptionDiv = document.createElement("div");
        this.modalSensiOptionLabel = document.createElement("label");
        this.modalSensiOptionSlider = document.createElement("input");
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

        this.modalSensiOptionDiv.classList.add("modal__options__option");
        this.modalSensiOptionLabel.textContent = "Paddle speed";
        this.modalSensiOptionSlider.type = "range";
        this.modalSensiOptionSlider.value = Options.keyboardSensitivity;
        this.modalSensiOptionSlider.min = 1;
        this.modalSensiOptionSlider.max = 3;
        this.modalSensiOptionSlider.step = 1;

        this.modalSensiOptionSlider.addEventListener("input", function () {
            Options.keyboardSensitivity = Number(this.value);
        })

        this.controlsSelect.appendChild(controlsSelectOpt1);
        this.controlsSelect.appendChild(controlsSelectOpt2);
        this.modalOptionDiv.appendChild(this.modalOptionLabel);
        this.modalOptionDiv.appendChild(this.controlsSelect);
        this.modalSensiOptionDiv.appendChild(this.modalSensiOptionLabel);
        this.modalSensiOptionDiv.appendChild(this.modalSensiOptionSlider);
        this.modalOptions.appendChild(this.modalTitle);
        this.modalOptions.appendChild(this.modalOptionDiv);

        this.modal.appendChild(this.modalOptions);
        document.body.appendChild(this.modal);

        this.handleSensiOptionVisibility();

        this.controlsSelect.selectedIndex = Options.controlType;
        this.controlsSelect.addEventListener("input", () => {
            Options.controlType = Number(this.controlsSelect.value);

            this.handleSensiOptionVisibility();

        })



        // When the user clicks anywhere outside of the modal, close it
        document.addEventListener("click", (event) => {
            if (event.target == this.modal) this.modal.remove();
        });

    }

    handleSensiOptionVisibility() {
        switch (Options.controlType) {
            case 0:
                this.modalSensiOptionDiv.remove();
                break;
            case 1:
                this.modalOptions.appendChild(this.modalSensiOptionDiv);
                break;
        }
    }

}






