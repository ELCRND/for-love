import { Header } from "./scripts/header.js";
import { GeographyMap } from "./scripts/map.js";
import { PhotoSlider } from "./scripts/photo-slider.js";
import { Popup } from "./scripts/popup.js";
import { ReviewsSlider } from "./scripts/reviews-slider.js";
import { ServicesSlider } from "./scripts/services-slider.js";

document.addEventListener("DOMContentLoaded", () => {
  new Popup();
  const header = new Header();
  new PhotoSlider();
  new GeographyMap();
  const servicesSlider = new ServicesSlider();
  const reviewsSlider = new ReviewsSlider();

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      header.IS_ACTIVE && header.off();
      servicesSlider.IS_ACTIVE && servicesSlider.off();
      return;
    }

    if (window.innerWidth <= 767) {
      !header.IS_ACTIVE && header.on();
      !servicesSlider.IS_ACTIVE && servicesSlider.on();
      return;
    }

    if (window.innerWidth <= 767) {
      reviewsSlider.off();
      reviewsSlider.on();
      return;
    }
  });
});
