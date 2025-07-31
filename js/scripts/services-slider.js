export class ServicesSlider {
  constructor() {
    this._SLIDER = document.querySelector(".services__slider");
    this._SLIDER_LIST = document.querySelector(".services__list");
    this._SLIDER_ITEMS = document.querySelectorAll(".services__item");
    this._SLIDER_PREV = document.querySelector(
      ".services__slider-controls-prev"
    );
    this._SLIDER_NEXT = document.querySelector(
      ".services__slider-controls-next"
    );

    this.IS_ACTIVE = false;
    // this._OFFSET = parseInt(
    //   window.getComputedStyle(this._SLIDER_LIST.firstElementChild).width
    // );
    this._TOTAL_SLIDES = this._SLIDER_ITEMS.length;
    this._CURRENT_SLIDE = 0;
    // this._GAP = parseInt(window.getComputedStyle(this._SLIDER_LIST).columnGap);

    this.handlePrev = () => this._prev();
    this.handleNext = () => this._next();
    this.handleUpdate = () => this._update();

    this._init();
  }

  _prev() {
    if (this._CURRENT_SLIDE <= 0) {
      return;
    }

    this._unlock("prev");

    this._CURRENT_SLIDE -= 1;

    this._update();
  }

  _next() {
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

    if (action === "init") {
      this._SLIDER_PREV.disabled = true;
      this._SLIDER_NEXT.disabled = false;
    }
  }

  _update() {
    this._SLIDER_LIST.style = `
      translate: -${
        (this._SLIDER_LIST.firstElementChild.offsetWidth +
          parseInt(window.getComputedStyle(this._SLIDER_LIST).columnGap)) *
        this._CURRENT_SLIDE
      }px 0;
      `;
  }

  off() {
    this.IS_ACTIVE = false;

    this._CURRENT_SLIDE = 0;
    this._SLIDER_LIST.style = `
    translate: 0 0;
    `;

    this._unlock("init");
    this._SLIDER_PREV.removeEventListener("click", this.handlePrev);
    this._SLIDER_NEXT.removeEventListener("click", this.handleNext);
    window.removeEventListener("resize", this.handleUpdate);
  }

  on() {
    this.IS_ACTIVE = true;

    this._SLIDER_PREV.addEventListener("click", this.handlePrev);
    this._SLIDER_NEXT.addEventListener("click", this.handleNext);
    window.addEventListener("resize", this.handleUpdate);
  }

  _init() {
    if (window.innerWidth <= 767 && !this.IS_ACTIVE) {
      this.on();
    }
  }
}
