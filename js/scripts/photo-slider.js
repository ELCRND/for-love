export class PhotoSlider {
  constructor() {
    this._SLIDER = document.querySelector(".about__slider");
    this._SLIDER_LIST = document.querySelector(".about__slider-list");
    this._SLIDER_ITEMS = document.querySelectorAll(".about__slider-list-item");
    this._SLIDER_PREV = document.querySelector(".about__slider-controls-prev");
    this._SLIDER_NEXT = document.querySelector(".about__slider-controls-next");

    this._TOTAL_SLIDES = this._SLIDER_ITEMS.length;
    this._CURRENT_SLIDE = 0;
    this._OFFSET = 20;
    this._DEGREE = 2;
    this._TRANSPARENT_STEP = 0.3;

    this._init();
  }

  prev() {
    if (this._CURRENT_SLIDE <= 0) {
      return;
    }

    this._unlock("prev");

    this._SLIDER_ITEMS[this._CURRENT_SLIDE].style = `
      opacity: 0;
    `;

    this._CURRENT_SLIDE -= 1;

    this._update();
  }

  next() {
    if (this._CURRENT_SLIDE >= this._TOTAL_SLIDES - 1) {
      return;
    }

    this._unlock("next");

    this._CURRENT_SLIDE += 1;

    this._update();
  }

  _unlock(action) {
    if (action === "prev") {
      this._SLIDER_NEXT.disabled = false;
      if (this._CURRENT_SLIDE <= 1) {
        this._SLIDER_PREV.disabled = true;
      }
    }

    if (action === "next") {
      this._SLIDER_PREV.disabled = false;
      if (this._CURRENT_SLIDE >= this._TOTAL_SLIDES - 2) {
        this._SLIDER_NEXT.disabled = true;
      }
    }
  }

  _update() {
    for (let i = 0; i <= this._CURRENT_SLIDE; i++) {
      this._SLIDER_ITEMS[i].style = `
      translate: -${this._OFFSET * (this._CURRENT_SLIDE - i)}% 0;
      opacity: ${1 - this._TRANSPARENT_STEP * (this._CURRENT_SLIDE - i)};
      rotate: -${this._DEGREE * (this._CURRENT_SLIDE - i)}deg;
      `;

      this._SLIDER_ITEMS[this._CURRENT_SLIDE].style.opacity = "1";
    }
  }

  _init() {
    this._SLIDER_PREV.addEventListener("click", this.prev.bind(this));
    this._SLIDER_NEXT.addEventListener("click", this.next.bind(this));
  }
}
