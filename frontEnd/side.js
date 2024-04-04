document.getElementById("profButton").addEventListener("click", function () {
  var sideNav = document.querySelector(".side");
  if (sideNav.classList.contains("slide")) {
       sideNav.classList.remove("slide");
       sideNav.classList.add("slide-back");
  } else {
       sideNav.classList.remove("slide-back");
       sideNav.classList.add("slide");
  }
 });
document.addEventListener("click", function(event) {
  var isClickInside = document.querySelector(".side").contains(event.target);
  var sideNav = document.querySelector(".side");
  var profButton = document.getElementById("profButton");
 
  // Check if the click is outside the side navigation and not on the profile button
  if (!isClickInside && event.target !== profButton) {
       // If the side navigation is visible, hide it
       if (sideNav.classList.contains("slide")) {
           sideNav.classList.remove("slide");
           sideNav.classList.add("slide-back");
       }
  }
 });
 