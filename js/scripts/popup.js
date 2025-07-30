export class Popup {
  constructor() {
    this._POPUP = document.querySelector(".popup");
    this._OVERLAY = document.querySelector(".overlay");
    this._OPEN_BTNS = document.querySelectorAll(".open-popup");
    this._CLOSE_BTN = document.querySelector(".popup__close");

    this._init();
  }

  open() {
    this._POPUP.classList.add("open");
    this._OVERLAY.classList.add("open");
    document.body.classList.add("is-lock");
  }

  close() {
    this._POPUP.classList.remove("open");
    this._OVERLAY.classList.remove("open");
    document.body.classList.remove("is-lock");
  }

  _init() {
    this._OPEN_BTNS.forEach((btn) =>
      btn.addEventListener("click", () => this.open())
    );
    this._CLOSE_BTN.addEventListener("click", () => this.close());
    this._OVERLAY.addEventListener("click", () => this.close());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  }
}
