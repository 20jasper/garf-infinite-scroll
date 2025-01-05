const OFFSET = 80;
const SRC = "./garfbody7.webp";
const ALT = "the body of an orange and black cat";
const html = document.querySelector("html");
const contentContainer = document.querySelector("#list");
const garfMetersCount = document.querySelector("#garfmeters-counter");

const garfBody = () => {
  const li = document.createElement("li");

  const img = document.createElement("img");
  img.src = SRC;
  img.alt = ALT;

  li.appendChild(img);
  return li;
};

const updateGarfMeters = (() => {
  let garfMeters = 0;
  return () => {
    garfMeters += 1;
    garfMetersCount.textContent = garfMeters;
  };
})();

window.addEventListener("scroll", () => {
  updateGarfMeters();
});

const intersectionObserver = new IntersectionObserver((entries) => {
  console.debug(entries);
  if (entries[0].intersectionRatio <= 0) return;

  console.debug("append some garfs");
  for (let i = 0; i < 10; i++) {
    contentContainer.appendChild(garfBody());
  }
});
intersectionObserver.observe(document.querySelector(".observable"));

const GARF_BODY_HEIGHT = 159;
const loops =
  2 * Math.ceil(html.getBoundingClientRect().bottom / GARF_BODY_HEIGHT);

for (let i = 0; i < loops; i++) {
  contentContainer.appendChild(garfBody());
}
