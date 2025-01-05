const SELECTORS = {
  html: document.querySelector("html"),
  contentContainer: document.querySelector("#list"),
  garfMetersCount: document.querySelector("#garfmeters-counter"),
  observable: document.querySelector(".observable"),
};

const GARF_BODY_IMAGE = {
  src: "./garfbody7.webp",
  alt: "the body of an orange and black cat",
};
const GARF_FOOT_IMAGE = {
  src: "./garfoot8.webp",
  alt: "a singular foot of garfield",
};
const MIN_GARFMETERS = 5000;

const garfBody = ({ src, alt }) => {
  const li = document.createElement("li");

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;

  li.appendChild(img);
  return li;
};

const intersectionObserver = new IntersectionObserver(([observer]) => {
  if (!observer.isIntersecting) return;

  console.debug("append some garfs");
  for (let i = 0; i < 10; i++) {
    SELECTORS.contentContainer.appendChild(garfBody(GARF_BODY_IMAGE));
  }
});
intersectionObserver.observe(SELECTORS.observable);

const GARF_BODY_HEIGHT = 159;
const loops =
  2 *
  Math.ceil(SELECTORS.html.getBoundingClientRect().bottom / GARF_BODY_HEIGHT);

for (let i = 0; i < loops; i++) {
  SELECTORS.contentContainer.appendChild(garfBody(GARF_BODY_IMAGE));
}

const updateGarfMeters = (() => {
  let garfMeters = 0;
  return () => {
    garfMeters += 1;
    SELECTORS.garfMetersCount.textContent = garfMeters;
    return garfMeters;
  };
})();

updateGarfMeters();

const scrollHandler = (() => {
  let foundFoot = false;
  return () => {
    if (
      updateGarfMeters() > MIN_GARFMETERS &&
      Math.random() > 0.9 &&
      !foundFoot
    ) {
      intersectionObserver.unobserve(SELECTORS.observable);

      SELECTORS.contentContainer.appendChild(garfBody(GARF_FOOT_IMAGE));

      const congrats = document.createElement("p");
      congrats.textContent =
        "Congratulations! You found the fabled Garfoot! What you do with the unparalleled power you've just gained is up to you";
      SELECTORS.contentContainer.appendChild(congrats);

      foundFoot = true;
    }
  };
})();
window.addEventListener("scroll", scrollHandler);
