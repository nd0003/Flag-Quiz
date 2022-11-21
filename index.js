/* Declaring variables */
let score = document.querySelector(".score span");
let scoreDiv = document.querySelector(".score");
let countSpan = document.querySelector(".count span");
let img = document.querySelector(".img img");
let imgDiv = document.querySelector(".img");
let options = document.querySelector(".options ul");
let list = document.querySelector(".options ul li");
let finalScore = document.querySelector(".finalScore");
let currentIndex = 0;
let correctAnswer = 0;
let incorrectAnswer = document.querySelector(".score .incorrect span");
let cAns = document.querySelector(".score .correct span");

/* Making the flags and questions show up on the website */
function getData() {
  let req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let questions = JSON.parse(this.responseText);
      let numQ = 251;
      qNum(numQ);
      questions = questions
        .sort(() => Math.random() - Math.random())
        .slice(0, 251);

      addData(questions[currentIndex], numQ);

      list.forEach((li) => {
        li.addEventListener("click", () => {
          let correctAnswer = questions[currentIndex].correctAnswer;
          li.classList.add("active");
          currentIndex++;
          setTimeout(() => {
            checkAnswer(correctAnswer, numQ);
          }, 500);
          setTimeout(() => {
            img.src = "";
            li.classList.remove("active");
            li.classList.remove("correct");
            li.classList.remove("incorrect");
            addData(questions[currentIndex], numQ);
          }, 1000);

          setTimeout(() => {
            showResults(numQ);
          }, 1002);
        });
      });
    }
  };
}

getData();

function qNum(num) {
  countSpan.innerHTMl = num;
}

function addData(obj, count) {
  if (currentIndex < count) {
    img.src = `img/${obj.img}`;
    list.forEach((li, i) => {
      li.id = `answer_${i + 1}`;
      li.dataset.answer = obj[`options`][i];
      li.innerHTML = obj[`options`][i];
    });
  }
}

function checkAnswer(rAns, count) {
  let chosenAns;
  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("active")) {
      chosenAns = list[i].dataset.answer;
      if (rAns === chosenAns) {
        list[i].classList.add("correct");
        rAns++;
        score.innerHTMl = rAns;
      } else {
        list[i].classList.add("incorrect");
      }
    }
  }
}

function showResults(count) {
  if (currentIndex === count) {
    options.innerHTML = "";
    imgDiv.innerHTML = "";
    scoreDiv.style.display = "block";
    correctAnswer.innerHTML = cAns;
  }
}
