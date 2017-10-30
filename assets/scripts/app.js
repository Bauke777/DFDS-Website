// Written by: Bauke Posthuma
//
// Sources
// https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
// https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
// https://www.w3schools.com/js/js_htmldom_eventlistener.asp
// https://stackoverflow.com/questions/13963613/replace-content-of-div-with-another-content

///////////////
// NIGHTMODE //
///////////////
var nightmodeTrigger = document.getElementById("nightmode");

function toggleNightmode(event) {
  document.body.classList.toggle("nightmode");
  document.body.classList.add("transition");
  setTimeout(function () {document.body.classList.remove("transition");}, 1000);
  event.preventDefault();
}

nightmodeTrigger.addEventListener("click", toggleNightmode);

///////////////////
// Login Layover //
///////////////////

// Scale the banner's height on first open
var staticDiv = document.querySelector("#login_layover div div:first-of-type");
var dynamicDiv = document.querySelector("#login_layover div div:last-of-type");

function resizeStaticDiv() {
  staticDiv.style.height = dynamicDiv.clientHeight + "px";
}

// Show overlay after click on trigger
var loginTrigger = document.getElementById("login");

function toggleLoginLayover(event) {
  document.body.classList.toggle("login");
  resizeStaticDiv();
  event.preventDefault();
}

loginTrigger.addEventListener("click", toggleLoginLayover);

// Close on click on overlay-background
// Source: https://stackoverflow.com/questions/13918441/javascript-addeventlistener-without-selecting-children
var loginLayover = document.querySelector("#login_layover");

loginLayover.addEventListener('click', function(event){
  if (loginLayover !== event.target) return;
  toggleLoginLayover();
}, false);

// Login & Register tabs
var login = document.querySelector("#login_layover h2:first-of-type");
var loginForm = document.querySelector("#login_layover form:first-of-type");
var register = document.querySelector("#login_layover h2:last-of-type");
var registerForm = document.querySelector("#login_layover form:last-of-type");

function switchTab() {
  if (login.classList.contains("active")) {
    login.classList.remove("active");
    loginForm.classList.remove("active");
    register.classList.add("active");
    registerForm.classList.add("active");
  } else if (register.classList.contains("active")) {
    register.classList.remove("active");
    registerForm.classList.remove("active");
    login.classList.add("active");
    loginForm.classList.add("active");
  }
}

login.addEventListener("click", switchTab);
register.addEventListener("click", switchTab);




/////////////
// FILTERS //
/////////////

// Set filters
var ul = document.querySelector("main ul");
var li = ul.getElementsByTagName("li");
var activeFilter = [];

function disableAllFilters() {
  for (var i = 0 ; i < li.length; i++) {
    li[i].classList.remove("active");
  }
}

// Listen for filter click event
for (var i = 0 ; i < li.length; i++) {

    li[i].addEventListener('click', function(event) {
        //alert(event.target.textContent);
        disableAllFilters();
        event.target.classList.add("active");
        activeFilter = event.target.textContent;
        filterArticles();
    });

}

// Filter the articles
var articles = document.querySelector("main div").getElementsByTagName("article");

function resetFilters() {

  for (var i = 0 ; i < articles.length; i++) {
    articles[i].classList.replace("hide", "appear");
    articles[i].classList.replace("hidden", "appear");
    articles[i].style.order = "";
  }
}

function filterArticles() {

  resetFilters();

  // Populair
  if ( activeFilter === "Populair" ) {
    for (var i = 0 ; i < articles.length; i++) {
      var popularity = articles[i].querySelector("div div span:last-of-type").textContent.split(" ")[0];
      articles[i].style.order = "-" + popularity;
    }
  }

  // Korte verhalen
  if ( activeFilter === "Korte verhalen" ) {

    for (var i = 0 ; i < articles.length; i++) {
      var readTime = articles[i].querySelector("div div span:first-of-type").textContent.split(" ")[0];

      if ( readTime > 3) {
        articles[i].classList.add("hide");

        // Fisically hide elements after animation
        setTimeout(function () {
          var hiddenArticles = document.getElementsByClassName("hide"); //divsToHide is an array
          for(var i = 0; i < hiddenArticles.length; i++){
              hiddenArticles[i].classList.replace("hide", "hidden");
          }
        }, 500);
      }
    }

  }

  // Lange verhalen
  if ( activeFilter === "Lange verhalen" ) {

    for (var i = 0 ; i < articles.length; i++) {
      var readTime = articles[i].querySelector("div div span:first-of-type").textContent.split(" ")[0];

      if ( readTime < 5) {
        articles[i].classList.add("hide");

        // Fisically hide elements after animation
        setTimeout(function () {
          var hiddenArticles = document.getElementsByClassName("hide"); //divsToHide is an array
          for(var i = 0; i < hiddenArticles.length; i++){
            hiddenArticles[i].classList.replace("hide", "hidden");
          }
        }, 500);
      }
    }

  }

}
