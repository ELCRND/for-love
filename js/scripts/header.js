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

    this.init();
  }

  toggle() {
    this._DROPDOWN_BTN.classList.toggle("open");
  }

  close(e) {
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

    this._DROPDOWN_BTN.addEventListener("click", this.toggle.bind(this));
    this._DROPDOWN_LIST_ITEMS.forEach((item) =>
      item.addEventListener("click", this.close.bind(this))
    );
  }

  off() {
    this.IS_ACTIVE = false;
    this._DROPDOWN_BTN.removeEventListener("click", this.toggle);
    this._DROPDOWN_LIST_ITEMS.forEach((item) =>
      item.removeEventListener("click", this.close)
    );
    this._DROPDOWN_BTN_TEXT.textContent = "";
  }
}
