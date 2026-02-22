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
