export class GeographyMap {
  constructor() {
    this._MAP = document.querySelector(".geography__map");
    this._LOCATIONS = this._MAP.querySelectorAll(".geography__map-location");
    this._OBSERVER = null;

    this._SHOW_SPEED = 400;
    this._ANIMATION_SPEED = 2000;

    this._init();
  }

  hideAllLocations() {
    this._LOCATIONS.forEach((location) => {
      location.style = `
        opacity:0;
        visibility:hidden;
        `;
    });
  }

  showLocationsRandomly() {
    const shuffledLocations = this._shuffle([...this._LOCATIONS]);

    shuffledLocations.forEach((location, index) => {
      setTimeout(() => {
        location.style = `
        opacity:1;
        visibility:visible;
         transition:opacity ${this._ANIMATION_SPEED}ms ease
        `;
      }, index * this._SHOW_SPEED);
    });
  }

  _shuffle(locations) {
    return locations.sort(() => Math.random() - 0.5);
  }

  _init() {
    this.hideAllLocations();

    this._OBSERVER = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.showLocationsRandomly();
            this._OBSERVER.unobserve(this._MAP);
          }
        });
      },
      { threshold: 0.1 }
    );

    this._OBSERVER.observe(this._MAP);
  }
}
