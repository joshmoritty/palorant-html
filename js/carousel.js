const selectors = document.querySelectorAll(".carousel-selector");
const slides = document.querySelectorAll(".carousel-slide");
const selectorContainer = document.querySelector(".carousel-selectors");

const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const prevSelectorButton = document.querySelector(".carousel-prev-selector");
const nextSelectorButton = document.querySelector(".carousel-next-selector");

let activeSlide = 0;

const changeSlide = (nextSlide) => {
  const prevSelector = selectors[activeSlide];
  const prevContent = slides[activeSlide];
  const nextSelector = selectors[nextSlide];
  const nextContent = slides[nextSlide];

  prevSelector.classList.remove("active");
  nextSelector.classList.add("active");

  prevContent.classList.remove("active");
  nextContent.classList.add("active");

  nextSelector.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center",
  });

  if (activeSlide === 0 && nextSlide > 0) {
    prevButton.removeAttribute("disabled");
  } else if (nextSlide === 0) {
    prevButton.setAttribute("disabled", "");
  }

  if (activeSlide === slides.length - 1 && nextSlide < slides.length - 1) {
    nextButton.removeAttribute("disabled");
  } else if (nextSlide === slides.length - 1) {
    nextButton.setAttribute("disabled", "");
  }

  activeSlide = nextSlide;
};

selectors.forEach((b) =>
  b.addEventListener("click", (e) => {
    const id = e.currentTarget.id;
    const nextSlide = Number(id.substring(6, id.length - 9)) - 1;
    changeSlide(nextSlide);
  })
);

prevButton.addEventListener("click", () => {
  if (activeSlide === 0) return;

  changeSlide(activeSlide - 1);
});

nextButton.addEventListener("click", () => {
  if (activeSlide === slides.length - 1) return;

  changeSlide(activeSlide + 1);
});

prevSelectorButton.addEventListener("click", () => {
  selectorContainer.scrollBy({ left: -500, behavior: "smooth" });
});

nextSelectorButton.addEventListener("click", () => {
  selectorContainer.scrollBy({ left: 500, behavior: "smooth" });
});

if (
  Math.abs(selectorContainer.scrollWidth - selectorContainer.clientWidth) <
  0.001
) {
  nextSelectorButton.setAttribute("disabled", "");
}

selectorContainer.addEventListener("scroll", () => {
  const scroll =
    selectorContainer.scrollLeft /
    (selectorContainer.scrollWidth - selectorContainer.clientWidth);

  if (scroll < 0.05 && prevSelectorButton.getAttribute("disabled") == null) {
    prevSelectorButton.setAttribute("disabled", "");
  }
  if (scroll >= 0.05 && prevSelectorButton.getAttribute("disabled") != null) {
    prevSelectorButton.removeAttribute("disabled");
  }
  if (scroll > 0.95 && nextSelectorButton.getAttribute("disabled") == null) {
    nextSelectorButton.setAttribute("disabled", "");
  }
  if (scroll <= 0.95 && nextSelectorButton.getAttribute("disabled") != null) {
    nextSelectorButton.removeAttribute("disabled");
  }
});
