const SELECTORS = {
  html: document.querySelector("html"),
  dialog: document.querySelector("dialog"),
  contentContainer: document.querySelector("#list"),
  garfMetersCount: document.querySelector("#garfmeters-counter"),
  observable: document.querySelector(".observable"),
  titanicFact: document.querySelector("#titanic"),
};

const GARF_BODY_IMAGE = {
  src: "./garfbody7.webp",
  alt: "",
};
const GARF_FOOT_IMAGE = {
  src: "./garfoot8.webp",
  alt: "",
};
const facts = [
  {
    src: "garftanic.png",
    alt: "garfield next to the titanic",
    description: "Garfield sunk the titanic 1004 garfmeters under sea level",
  },
  {
    src: "https://media1.tenor.com/m/s96Vt-iwxwEAAAAd/garfiel-garfield.gif",
    alt: "dancing garfield",
    description: "Garfield sunk the titanic 1004 garfmeters under sea level",
  },
  {
    src: "tattoo.png",
    alt: "heart tattoo with the word mom",
    description: "Garfield got their first garftoos at age 22 in cat years",
  },
];
const MIN_GARFMETERS_BEFORE_FOOT = 5000;
const PIXELS_PER_GARF_METER = 100;
const MAX_METERS_BEFORE_FACT = 500;

const garfBody = ({ src, alt }) => {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;

  return img;
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

const getGarfMeters = () => {
  const garfMeters = window.scrollY / PIXELS_PER_GARF_METER;
  return garfMeters;
};

getGarfMeters();

document.querySelector("#start-form").addEventListener("submit", () => {
  SELECTORS.html.style.overflowY = "auto";
  document.querySelector("#garf-score-div").classList.remove("hidden");
});

function getGarfFact({ src, alt, description }) {
  const figure = document.createElement("figure");

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = description;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
}

function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

const setAriaPolite = (val) => {
  SELECTORS.garfMetersCount.setAttribute("aria-live", val);
};

const announceGarfMetersDebounced = debounce((val) => {
  setAriaPolite(val);
  SELECTORS.garfMetersCount.textContent = getGarfMeters().toFixed(3);
}, 1500);

function* garfFactFigureGenerator(facts) {
  for (const x of facts.map(getGarfFact)) {
    yield x;
  }
}
const garfFactFigureGen = garfFactFigureGenerator(facts);

const scrollHandler = (() => {
  let foundFoot = false;
  let lastAddedFactCoord = 0;
  return () => {
    SELECTORS.garfMetersCount.textContent = getGarfMeters().toFixed(3);

    setAriaPolite("off");
    announceGarfMetersDebounced("polite");

    if (
      getGarfMeters() > MIN_GARFMETERS_BEFORE_FOOT &&
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
    } else if (
      getGarfMeters() - lastAddedFactCoord > MAX_METERS_BEFORE_FACT ||
      (lastAddedFactCoord + 100 < getGarfMeters() && Math.random() > 0.99)
    ) {
      const { done, value } = garfFactFigureGen.next();
      console.log("add garf fact", { done, value });
      if (done) {
        return;
      }
      lastAddedFactCoord = getGarfMeters();
      value.style.position = "absolute";
      value.style.bottom = `${-(Math.trunc(window.scrollY) + 1000)}px`;
      document.querySelector("#fact-container").appendChild(value);
    }
  };
})();

scrollHandler();
window.addEventListener("scroll", scrollHandler);

SELECTORS.dialog.showModal();
