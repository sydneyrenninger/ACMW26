/* Password checker – only on password.html */
const password = document.getElementById("password");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const toggleBtn = document.getElementById("toggleBtn");

if (password && strengthBar && strengthText && toggleBtn) {
  password.addEventListener("input", () =>{
  let val = password.value;
  let strength = 0;

  if(val.match(/[a-z]/))strength++;
  if(val.match(/[A-Z]/))strength++;
  if(val.match(/[0-9]/))strength++;
  if(val.match(/[$@#&!]/))strength++;
  if(val.length >= 12)strength++;

  if(val === ""){
    strengthBar.style.width = "0%";
    strengthBar.style.background = "transparent";
    strengthBar.innerText = "Start typing...";
    return;
  }
  switch(strength){
    case 1:
      strengthBar.style.width = "20%";
      strengthBar.style.background = "#ff4f4f";
      strengthText.innerText = "Very Weak";
      break;
    case 2:
      strengthBar.style.width = "40%";
      strengthBar.style.background = "#ff914d";
      strengthText.innerText = "Weak";
      break;
    case 3:
      strengthBar.style.width = "60%";
      strengthBar.style.background = "#3ffc93c";
      strengthText.innerText = "Medium";
      break;
    case 4:
      strengthBar.style.width = "80%";
      strengthBar.style.background = "#7cd992";
      strengthText.innerText = "Strong";
      break;
    case 5:
      strengthBar.style.width = "100%";
      strengthBar.style.background = "#2ecc71";
      strengthText.innerText = "Very Strong";
      break;
  }
  });

  toggleBtn.addEventListener("click", () =>{
    if(password.type === "password"){
      password.type = "text";
      toggleBtn.textContent = "Hide";
    }
    else{
      password.type = "password";
      toggleBtn.textContent = "Show";
    }
  });
}

/* Phishing activity – only on phishing.html, separate counter per example */
(function () {
  var activities = ["1", "2"];

  function initActivity(activityId) {
    var counterEl = document.getElementById("phishCounter" + activityId);
    if (!counterEl) return;

    var spots = document.querySelectorAll('.phish-spot[data-activity="' + activityId + '"]');
    var total = spots.length;
    var list = document.getElementById("hintListItems" + activityId);
    var empty = document.getElementById("hintListEmpty" + activityId);
    if (!list || !empty) return;

    var found = {};

    function updateCounter() {
      var count = Object.keys(found).length;
      counterEl.textContent = "You found " + count + " of " + total + " red flags.";
    }

    function addHint(issue, explanation) {
      if (found[issue]) return;
      found[issue] = explanation;
      empty.style.display = "none";
      var li = document.createElement("li");
      li.innerHTML = "<strong>" + issue + ":</strong> " + explanation;
      list.appendChild(li);
      updateCounter();
    }

    spots.forEach(function (el) {
      el.addEventListener("click", function () {
        var issue = this.getAttribute("data-issue");
        var explanation = this.getAttribute("data-explanation");
        if (issue && explanation) {
          addHint(issue, explanation);
          this.classList.add("phish-spot--found");
        }
      });
    });

    updateCounter();
  }

  activities.forEach(initActivity);
})();

/* Website acitivity - only on website.html */
const questions = [
  {
    question: "Which is the real Amazon website?",
    answers:[
      {text: "https://www.amazon-shopping.net", correct: false}
       {text: "https://www.amaz0n.com", correct: false}
       {text: "http://amazon-deals.co", correct: false}
       {text: "https://www.amazon.com", correct: true}
    ]
  }, 

  {
    question: "Which website option is the most credible for health information?",
    answers:[
      {text: "http://health-secrets-blog.com", correct: false}
       {text: "https://www.cdc.gov", correct: true}
       {text: "http://cdc-updates.net", correct: false}
       {text: "https://cdc-notreal.org", correct: false}
    ]
  }, 

  {
    question: "Which website option is the most credible for space research?",
    answers:[
      {text: "https://www.nasa.gov", correct: true}
       {text: "http://nasa-space-news.com", correct: false}
       {text: "https://www.nasa-official.net", correct: false}
       {text: "http://nasaupdates.info", correct: false}
    ]
  }, 

   {
    question: "Which website option is the most credible for news?",
    answers:[
      {text: "http://bbc-breaking-news.net", correct: false}
       {text: "http://nasa-space-news.com", correct: true}
       {text: "https://bbc-world-news.co", correct: false}
       {text: "http://bbcarchive.internet", correct: false}
    ]
  }, 

  {
    question: "Which website option is the most credible for online banking?",
    answers:[
      {text: "http://chase-secure-login.net", correct: false}
       {text: "https://www.chase.com", correct: true}
       {text: "https://www.chasebank-login.co", correct: false}
       {text: "http://secure-chase-info.org", correct: false}
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  let currentQuestion=questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex +1;
  questionelement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
}
startQuiz();


