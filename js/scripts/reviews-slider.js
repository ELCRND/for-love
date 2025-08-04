export class ReviewsSlider {
  constructor() {
    this._SLIDER_LIST = document.querySelector(".reviews__list");
    this._SLIDER_PREV = document.querySelector(
      ".reviews__slider-controls-prev"
    );
    this._SLIDER_NEXT = document.querySelector(
      ".reviews__slider-controls-next"
    );

    this._TOTAL_SLIDES = this._SLIDER_LIST.childElementCount;
    this._CURRENT_SLIDE = 0;
    this._ANIMATION_DURATION = 500;
    this._OFFSET_COUNT = this._TOTAL_SLIDES;
    // this.IS_ACTIVE = false;
    // this._IS_BLOCKED = false;

    this.handlePrev = () => this._prev();
    this.handleNext = () => this._next();
    this.handleUpdate = () => this._update();

    this._init();
  }

  //   get offsetCount() {
  //     return 4;
  //   }

  get activeIndex() {
    return window.innerWidth <= 767
      ? this._CURRENT_SLIDE
      : this._CURRENT_SLIDE + 1;
  }

  on() {
    this._addActive(1);
    this._cloneSlides();

    // this.IS_ACTIVE = true;

    this._SLIDER_PREV.addEventListener("click", this.handlePrev);
    this._SLIDER_NEXT.addEventListener("click", this.handleNext);
    window.addEventListener("resize", this.handleUpdate);
  }

  _prev() {
    // if (this._IS_BLOCKED) return;

    if (this._CURRENT_SLIDE === 0) {
      this._CURRENT_SLIDE = this._OFFSET_COUNT;
      this._updateNow();
    }

    this._CURRENT_SLIDE -= 1;

    this._update();

    // this._blockEvent();
  }

  _next() {
    // if (this._IS_BLOCKED) return;

    if (this._TOTAL_SLIDES - this._CURRENT_SLIDE === this._OFFSET_COUNT) {
      this._CURRENT_SLIDE = 0;
      this._updateNow();
    }

    this._CURRENT_SLIDE += 1;
    this._update();

    // this._blockEvent();
  }

  _update() {
    this._removeActive();
    this._addActive(this.activeIndex);

    this._SLIDER_LIST.style = `
        transition: translate ${this._ANIMATION_DURATION}ms ease-out;
        translate: ${
          -(
            this._SLIDER_LIST.firstElementChild.offsetWidth +
            parseInt(window.getComputedStyle(this._SLIDER_LIST).gap)
          ) * this._CURRENT_SLIDE
        }px 0;`;
  }

  _updateNow() {
    this._SLIDER_LIST.style = `
        transition: none;
        translate: ${
          -(
            this._SLIDER_LIST.firstElementChild.offsetWidth +
            parseInt(window.getComputedStyle(this._SLIDER_LIST).gap)
          ) * this._CURRENT_SLIDE
        }px 0;`;
  }

  _blockEvent() {
    this._IS_BLOCKED = true;

    setTimeout(() => (this._IS_BLOCKED = false), this._ANIMATION_DURATION);
  }

  off() {
    this._SLIDER_PREV.removeEventListener("click", this.handlePrev);
    this._SLIDER_NEXT.removeEventListener("click", this.handleNext);
    window.removeEventListener("resize", this.handleUpdate);
  }

  _removeActive(idx) {
    if (idx) {
      console.log([...this._SLIDER_LIST.children][idx]);
      [...this._SLIDER_LIST.children][idx].classList.remove(
        "reviews__item--active",
        "reviews__item--prev2"
      );

      return;
    }

    [...this._SLIDER_LIST.children].forEach((item) =>
      item.classList.remove("reviews__item--active", "reviews__item--prev2")
    );
  }

  _addActive(idx = 1) {
    if (window.innerWidth <= 767) {
      return;
    }

    this._SLIDER_LIST.children[idx].classList.add("reviews__item--active");
  }

  _cloneSlides() {
    [...this._SLIDER_LIST.children].forEach((li) => {
      const clone = li.cloneNode(true);
      this._SLIDER_LIST.appendChild(clone);
    });

    this._TOTAL_SLIDES = this._SLIDER_LIST.childElementCount;
  }

  _init() {
    this.on();
  }
}
