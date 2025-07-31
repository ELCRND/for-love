export class GeographyMap {
  constructor() {
    this._MAP = document.querySelector(".geography__map");
    this._LOCATIONS = this._MAP.querySelectorAll(".geography__map-location");
    this._LOCATIONS_DOTS = this._MAP.querySelectorAll(
      ".geography__map-location-dot"
    );
    this._OBSERVER = null;
    this._LOCATIONS_DATA_MAP = new Map();
    this._SHOW_SPEED = 400;
    this._ANIMATION_SPEED = 2000;
    this._IS_MOBILE = window.innerWidth <= 767;

    this._init();
    this._createDataMap();
  }

  hideAllLocations(locations) {
    locations.forEach((location) => {
      location.style = `
        opacity:0;
        visibility:hidden;
        `;
    });
  }

  showLocationsRandomly(locations) {
    const shuffledLocations = this._shuffle([...locations]);

    if (this._IS_MOBILE) {
      shuffledLocations.forEach((location, index) => {
        setTimeout(() => {
          this._LOCATIONS_DATA_MAP
            .get(location.getAttribute("data-location"))
            .classList.add("highlight");
          location.style = `
        opacity:1;
        visibility:visible;
         transition:opacity ${this._ANIMATION_SPEED}ms ease
        `;
        }, index * this._SHOW_SPEED * 3);
      });

      return;
    }

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

  _observe(locations) {
    this._OBSERVER = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.showLocationsRandomly(locations);

            this._OBSERVER.unobserve(this._MAP);
          }
        });
      },
      { threshold: 0.1 }
    );

    this._OBSERVER.observe(this._MAP);
  }

  _createDataMap() {
    this._LOCATIONS.forEach((l) => {
      const key = l.getAttribute("data-location");
      this._LOCATIONS_DATA_MAP.set(key, l);
    });
  }

  _init() {
    if (this._IS_MOBILE) {
      this.hideAllLocations(this._LOCATIONS_DOTS);
      this._observe(this._LOCATIONS_DOTS);
    } else {
      this.hideAllLocations(this._LOCATIONS);
      this._observe(this._LOCATIONS);
    }
  }
}
