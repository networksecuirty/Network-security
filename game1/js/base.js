let step = 0;


let choices = {
  letters: null,
  length: null,
  variety: null,
  extra: null
};

window.onload = () => {
  showStartScreen();
};

function showStartScreen() {
  const images = document.getElementById("images");
  const text = document.getElementById("text");
  const buttonBox = document.getElementById("buttonBox");
  const input = document.getElementById("input");

  if (input) input.style.display = "none";

  text.innerHTML = "";
  buttonBox.innerHTML = "";


  makeButton("Start ▶", () => {
    step = 0;
    nextStep();
  });
}

function nextStep() {
  const images = document.getElementById("images");
  const text = document.getElementById("text");
  const buttonBox = document.getElementById("buttonBox");

  text.innerHTML = "";
  buttonBox.innerHTML = "";

  step++;


  if (step === 1) images.style.backgroundImage = 'url("img/steps/step1.png")';
  if (step === 2) images.style.backgroundImage = 'url("img/steps/step2.png")';
  if (step === 3) images.style.backgroundImage = 'url("img/steps/step3.png")';
  if (step === 4) images.style.backgroundImage = 'url("img/steps/step4.png")';


  if (step === 1) {
    makeButton("All lowercase", () => { choices.letters = "lower"; nextStep(); });
    makeButton("Mix of lower & UPPER", () => { choices.letters = "mixed"; nextStep(); });
    makeButton("UPPERCASE at start/end", () => { choices.letters = "edges"; nextStep(); });
  }

  else if (step === 2) {
    makeButton("Short (4–6)", () => { choices.length = "short"; nextStep(); });
    makeButton("Medium (7–10)", () => { choices.length = "medium"; nextStep(); });
    makeButton("Long (11+)", () => { choices.length = "long"; nextStep(); });
  }

  else if (step === 3) {
    makeButton("Letters only", () => { choices.variety = "letters"; nextStep(); });
    makeButton("Letters + numbers", () => { choices.variety = "letters_numbers"; nextStep(); });
    makeButton("Letters + numbers + symbols", () => { choices.variety = "full"; nextStep(); });
  }

  else if (step === 4) {
    makeButton("Avoid repeating characters", () => { choices.extra = "norepeat"; showResult(); });
    makeButton("Add special characters (!@#$)", () => { choices.extra = "special"; showResult(); });
    makeButton("Mix everything randomly", () => { choices.extra = "random"; showResult(); });
  }
}

function showResult() {
  const images = document.getElementById("images");
  const text = document.getElementById("text");
  const buttonBox = document.getElementById("buttonBox");

  buttonBox.innerHTML = "";

  const score = calculateStrength();
  let description = "";

  if (score >= 10) {
    images.style.backgroundImage = 'url("img/results/win.png")';
    description = "You created a strong password!";
  } else if (score >= 6) {
    images.style.backgroundImage = 'url("img/results/improve.png")';
    description = "Your password is okay — but it could be stronger.";
  } else {
    images.style.backgroundImage = 'url("img/results/weak.jpg")';
    description = "Your password is very weak...";
  }

  text.innerHTML = `<p>${description}</p>`;
  makeButton("TRY AGAIN", resetGame);
}

function makeButton(label, action) {
  const btn = document.createElement("button");
  btn.innerText = label;
  btn.onclick = action;
  document.getElementById("buttonBox").appendChild(btn);
}

function calculateStrength() {
  let score = 0;


  if (choices.letters === "lower") score += 0;
  if (choices.letters === "mixed") score += 1;
  if (choices.letters === "edges") score += 2;


  if (choices.length === "short") score += 0;
  if (choices.length === "medium") score += 1;
  if (choices.length === "long") score += 3;


  if (choices.variety === "letters") score += 0;
  if (choices.variety === "letters_numbers") score += 2;
  if (choices.variety === "full") score += 3;


  if (choices.extra === "norepeat") score += 1;
  if (choices.extra === "special") score += 3;
  if (choices.extra === "random") score += 2;

  return score;
}

function resetGame() {
  step = 0;
  choices = { letters: null, length: null, variety: null, extra: null };
  showStartScreen();
}
