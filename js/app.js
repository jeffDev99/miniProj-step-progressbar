//  get elements from dom
const circles = document.querySelectorAll(".circle"),
  progressBar = document.querySelector(".indicator"),
  buttons = document.querySelectorAll("button");
let currentStep;
// functions
const handleSteps = (curStep) => {
  circles.forEach((circle, index) => {
    circle.classList[`${index < curStep ? "add" : "remove"}`]("active");
  });

  progressBar.style.width = `${((curStep - 1) / (circles.length - 1)) * 100}%`;

  if (curStep === circles.length) {
    buttons.forEach((button) => (button.disabled = false));
    buttons[1].disabled = true;
  } else if (curStep === 1) {
    buttons.forEach((button) => (button.disabled = false));
    buttons[0].disabled = true;
  } else {
    buttons.forEach((button) => (button.disabled = false));
  }
};
const updateStepsBtns = (e) => {
  currentStep = JSON.parse(localStorage.getItem("currentStep"))
  currentStep = e.target.id === "next" ? ++currentStep : --currentStep;
  localStorage.setItem("currentStep", currentStep);
  handleSteps(currentStep);
};
const clickOnSteps = (currentStep) => {
  circles.forEach((step) => step.classList.remove("active"));
  handleSteps(currentStep);
  localStorage.setItem("currentStep", currentStep)
};
// events
buttons.forEach((button) => {
  button.addEventListener("click", updateStepsBtns);
});
window.addEventListener("load", () => {
  currentStep = JSON.parse(localStorage.getItem("currentStep")) || localStorage.setItem("currentStep", 1) || 1;
  handleSteps(currentStep);
});
circles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    clickOnSteps(index + 1);
  });
});
