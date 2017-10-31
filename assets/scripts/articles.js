//////////////
// ARTICLES //
//////////////

// Source: https://www.w3schools.com/jsref/met_node_insertbefore.asp

// Open article in the main on click
// var articleLinks = document.querySelector("main").getElementsByTagName("a");
// var newContainer = document.createElement("div");
//
// for (var i = 0 ; i < articleLinks.length; i++) {
//
//     articleLinks[i].addEventListener('click', function(event) {
//       document.querySelector("body").insertBefore(newContainer, document.querySelector("main"));
//       document.querySelector("main").style.display = "none";
//       //.innerHTML = "<object type='text/html' data='" + event.target.href + "' ></object>";
//
//       event.preventDefault();
//     });
//
// }

// Save article
function saveArticle(event) {
  event.preventDefault();
  this.classList.toggle("saved");
  if (this.classList.contains("saved")) {
    this.getElementsByTagName("span")[0].innerHTML = "Bookmarked";
  } else {
    this.getElementsByTagName("span")[0].innerHTML = "Bookmark";
  }
}

document.getElementById("saveButton").addEventListener("click", saveArticle);

// Like article
function likeArticle(event) {
  event.preventDefault();
  this.classList.toggle("liked");
  if (this.classList.contains("liked")) {
    this.getElementsByTagName("span")[0].innerHTML = "Gewaardeerd";
  } else {
    this.getElementsByTagName("span")[0].innerHTML = "Waardeer";
  }
}

document.getElementById("likeButton").addEventListener("click", likeArticle);
