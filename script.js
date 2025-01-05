const OFFSET = 500;
const SRC = "./garfbody7.webp";
const ALT = "the body of an orange and black cat";
const html = document.querySelector("html");
const body = document.querySelector("body");
const garfMetersCount = document.querySelector("#garfmeters-counter");

const garfBody = () => {
  const img = document.createElement("img");
  img.src = SRC;
  img.alt = ALT;
  return img;
};

const updateGarfMeters = (() => {
  let garfMeters = 0;
  return () => {
    garfMeters += 1;
    garfMetersCount.textContent = garfMeters;
  };
})();

window.addEventListener("scroll", () => {
  const { bottom } = html.getBoundingClientRect();
  const { clientHeight } = html;
  console.debug({ bottom, scrollLimit: clientHeight + OFFSET });

  if (bottom < clientHeight + OFFSET) {
    console.log("at bottom");
    body.appendChild(garfBody());
    updateGarfMeters();
  }
});
