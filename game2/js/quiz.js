let questionIndex = 0;
let score = 0;

const quiz = [
  { img: "img/q1.png", answer: false },
  { img: "img/q2.png", answer: true },
  { img: "img/q3.png", answer: false },
  { img: "img/q4.png", answer: true },
  { img: "img/q5.png", answer: false }
];

window.onload = () => {
  showQuestion();
};

function showQuestion() {
  const images = document.getElementById("images");
  const text = document.getElementById("text");
  const buttonBox = document.getElementById("buttonBox");

  text.innerHTML = "";
  buttonBox.innerHTML = "";

  const q = quiz[questionIndex];

  images.style.backgroundImage = `url("${q.img}")`;

  makeButton("TRUE", () => checkAnswer(true));
  makeButton("FALSE", () => checkAnswer(false));
}

function checkAnswer(userAnswer) {
  const q = quiz[questionIndex];

  const text = document.getElementById("text");
  const buttonBox = document.getElementById("buttonBox");

  buttonBox.innerHTML = "";

  if (userAnswer === q.answer) {
    score++;
    text.innerHTML = "<p>Correct! ✔</p>";
  } else {
    text.innerHTML = "<p>Wrong ✖</p>";
  }

  setTimeout(() => {
    questionIndex++;
    if (questionIndex < quiz.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 800);
}

function showResult() {
  const images = document.getElementById("images");
  const text = document.getElementById("text");
  const buttonBox = document.getElementById("buttonBox");

  text.innerHTML = `<h2>Your Score: ${score}/${quiz.length}</h2>`;
  buttonBox.innerHTML = "";

  makeButton("Play Again 🔁", () => {
    questionIndex = 0;
    score = 0;
    showQuestion();
  });
}

function makeButton(label, action) {
  const btn = document.createElement("button");
  btn.innerText = label;
  btn.onclick = action;
  document.getElementById("buttonBox").appendChild(btn);
}
