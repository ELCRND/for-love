import { Header } from "./scripts/header.js";
import { GeographyMap } from "./scripts/map.js";
import { PhotoSlider } from "./scripts/photo-slider.js";
import { Popup } from "./scripts/popup.js";

document.addEventListener("DOMContentLoaded", () => {
  new Popup();
  const header = new Header();
  new PhotoSlider();
  new GeographyMap();

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767 && header.IS_ACTIVE) {
      header.off();
      return;
    }

    if (window.innerWidth <= 767 && !header.IS_ACTIVE) {
      header.on();
      return;
    }
  });
});
