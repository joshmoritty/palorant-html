const abilityButtons = document.querySelectorAll(".ability-button");
const abilityContents = document.querySelectorAll(".ability-content");

let activeAbility = 0;

const onClick = (e) => {
  const id = e.currentTarget.id;
  const nextAbility = Number(id.substring(8, id.length - 7)) - 1;

  const prevButton = abilityButtons[activeAbility];
  const nextButton = e.currentTarget;

  const prevContent = abilityContents[activeAbility];
  const nextContent = abilityContents[nextAbility];

  prevButton.removeAttribute("disabled");
  prevButton.classList.remove("active");

  nextButton.setAttribute("disabled", "");
  nextButton.classList.add("active");

  prevContent.classList.remove("active");
  nextContent.classList.add("active");

  const video = nextContent.getElementsByTagName("video");

  if (video.length > 0) {
    video[0].pause();
    video[0].currentTime = 0;
    video[0].play();
  }

  activeAbility = nextAbility;
};

abilityButtons.forEach((b) => b.addEventListener("click", onClick));
