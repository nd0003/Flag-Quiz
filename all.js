function restart() {
  window.location = "http://ndquiz.epizy.com/flags/all.html";
}

function newGame() {
  window.location = "http://ndquiz.epizy.com/flags/";
}

let numSpan = document.querySelector(".num span");
let imgDiv = document.querySelector(".flag-img");
let flagImg = document.querySelector(".flag img img");
let options = document.querySelector(".options ul");
let list = document.querySelectorAll(".options ul li");
let score = document.querySelector(".score span");
let scoreDiv = document.querySelector(".score-div");
let currentIndex = 0;
let rightAnswer = 0;
let correctAns = document.querySelector(".score-div .correct span");

function getQ() {
  let myReq = new XMLHttpRequest();
  myReq.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questions = JSON.parse(this.responseText);
      let numQ = 251;
      qNum(numQ);
      questions = questions
        .sort(() => Math.random() - Math.random())
        .slice(0, 10);

      addData(questions[currentIndex], numQ);

      list.forEach((li) => {
        li.addEventListener("click", () => {
          let rightAnswer = questions[currentIndex].rightAnswerr;
          li.classList.add("active");
          currentIndex++;

          setTimeout(() => {
            checkAns(rightAnswer, numQ);
          }, 500);

          setTimeout(() => {
            flagImg.src = "";
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
  myReq.open("GET", "random.json", true);
  myReq.send();
}

getQ();

function qNum(num) {
  numSpan.innerHTML = num;
}

function addData(obj, numm) {
  if (currentIndex < numm) {
    flagImg.src = `img/${obj.img}`;
    list.forEach((li, i) => {
      li.id = `answer_${i + 1}`;
      li.dataset.answer = obj[`options`][i];
      li.innerHTML = obj[`options`][i];
    });
  }
}

function checkAns(rAns, numm) {
  let chosenAns;
  for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("active")) {
      chosenAns = list[i].dataset.answer;
      if (rAns === chosenAns) {
        list[i].classList.add("correct");
        rAns++;
        score.innerHTML = rAns;
      } else {
        list[i].classList.add("incorrect");
      }
    }
  }
}

function showResults(numm) {
  if (currentIndex === numm) {
    options.innerHTML = "";
    imgDiv.innerHTML = "";
    scoreDiv.style.display = "block";
    correctAns.innerHTML = rightAnswer;
  }
}
