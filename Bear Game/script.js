const questions = [
  {
    question: "What colour is a soldier's camouflage uniform?",
    options: ["Bright red", "Green and brown", "Purple", "White"],
    answer: "Green and brown",
    type: "mcq"
  },
  {
    question: "True or False: A tank is a small weapon.",
    options: ["True", "False"],
    answer: "False",
    type: "truefalse"
  },
  {
    question: "Who helps lead the army?",
    options: ["A chef", "A captain", "A clown", "A cleaner"],
    answer: "A captain",
    type: "mcq"
  },
  {
    question: "True or False: Helmets are used for cooking.",
    options: ["True", "False"],
    answer: "False",
    type: "truefalse"
  }
];

let currentQuestion = 0;
let answered = {};
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const scoreEl = document.getElementById("score");

function showQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  scoreEl.textContent = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option");

    // If previously answered, show results
    if (answered[currentQuestion]) {
      btn.disabled = true;
      if (option === answered[currentQuestion].selected) {
        btn.style.backgroundColor = option === q.answer ? "#a0e6a0" : "#f6a0a0";
      }
      if (option === q.answer && option !== answered[currentQuestion].selected) {
        btn.style.backgroundColor = "#a0e6a0";
      }
    }

    btn.onclick = () => checkAnswer(option, btn);
    optionsEl.appendChild(btn);
  });

  // Show/hide navigation
  prevBtn.style.display = currentQuestion > 0 ? "inline-block" : "none";
  nextBtn.style.display = currentQuestion < questions.length - 1 ? "inline-block" : "none";
}

function checkAnswer(selected, button) {
  const correct = questions[currentQuestion].answer;

  // Disable all buttons
  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#a0e6a0";
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "#f6a0a0";
    }
  });

  // Save answer
  answered[currentQuestion] = {
    selected,
    isCorrect: selected === correct
  };

  // Update score
  score = Object.values(answered).filter(a => a.isCorrect).length;
}

nextBtn.onclick = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  }
};

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
};

showQuestion();
