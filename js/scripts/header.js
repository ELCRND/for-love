export class Header {
  constructor() {
    this._DROPDOWN_BTN = document.querySelector(".header__navigation");
    this._DROPDOWN_BTN_TEXT = this._DROPDOWN_BTN.querySelector(
      ".header__navigation-text"
    );
    this._DROPDOWN_LIST_ITEMS = document.querySelectorAll(
      ".header__navigation-item"
    );
    this.IS_ACTIVE = false;

    this.handleToggle = () => this._toggle();
    this.handleClose = (e) => this._close(e);

    this.init();
  }

  _toggle() {
    this._DROPDOWN_BTN.classList.toggle("open");
  }

  _close(e) {
    e.stopPropagation();
    this._DROPDOWN_BTN_TEXT.textContent = e.currentTarget.textContent;
    this._DROPDOWN_BTN.classList.remove("open");
  }

  init() {
    if (window.innerWidth <= 767 && !this.IS_ACTIVE) {
      this.on();
    }
  }

  on() {
    this.IS_ACTIVE = true;
    this._DROPDOWN_BTN_TEXT.textContent =
      this._DROPDOWN_LIST_ITEMS[0].textContent;

    this._DROPDOWN_BTN.addEventListener("click", this.handleToggle);
    this._DROPDOWN_LIST_ITEMS.forEach((item) =>
      item.addEventListener("click", this.handleClose)
    );
  }

  off() {
    this.IS_ACTIVE = false;
    this._DROPDOWN_BTN.removeEventListener("click", this.handleToggle);
    this._DROPDOWN_LIST_ITEMS.forEach((item) =>
      item.removeEventListener("click", this.handleClose)
    );
    this._DROPDOWN_BTN_TEXT.textContent = "";
  }
}
