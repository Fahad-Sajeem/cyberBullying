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
  // Select all buttons inside the .side div
var sideButtons = document.querySelectorAll(".side .sidebtn button");

// Add an event listener to each button
sideButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        // Hide the .side div
        var sideNav = document.querySelector(".side");
        sideNav.classList.remove("slide");
        sideNav.classList.add("slide-back");
    });
});

 });
//  document.getElementById("previewbtn").addEventListener("click", async function() {
//   const url = new URL('https://firebasestorage.googleapis.com/v0/b/cyber-login-a72ce.appspot.com/o/S2onaykKf0XcPzXpeJdbsB34D1K3%2Fbm38ntcQh_s.pdf?alt=media&token=bbd45b8c-2cf6-4b97-b15d-913457834cea'); // Replace with the actual path to your PDF
//   const response = await fetch(url);
//   const blob = await response.blob();
//   const objectURL = URL.createObjectURL(blob);
//   window.open(objectURL, '_blank'); 
// });

 


 

