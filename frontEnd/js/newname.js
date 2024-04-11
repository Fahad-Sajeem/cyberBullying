document.getElementById("editname").addEventListener("click", function () {
    var edNameDiv = document.querySelector(".ed_name");
    if (edNameDiv.classList.contains("slide-newname")) {
        edNameDiv.classList.remove("slide-newname");
        edNameDiv.classList.add("slide-newname-back");
    } else {
        edNameDiv.classList.remove("slide-newname-back");
        edNameDiv.classList.add("slide-newname");
    }
});
document.addEventListener("click", function(event) {
    var isClickInside = document.querySelector(".ed_name").contains(event.target);
    var edNameDiv = document.querySelector(".ed_name");
    var editNameButton = document.getElementById("editname");

    // Check if the click is outside the edit name div and not on the edit name button
    if (!isClickInside && event.target !== editNameButton) {
        // If the edit name div is visible, hide it
        if (edNameDiv.classList.contains("slide-newname")) {
            edNameDiv.classList.remove("slide-newname");
            edNameDiv.classList.add("slide-newname-back");
        }
    }
});
// Select all buttons inside the .ed_name div
var edNameButtons = document.querySelectorAll(".ed_name button");

// Add an event listener to each button
edNameButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        // Hide the .ed_name div
        var edNameDiv = document.querySelector(".ed_name");
        edNameDiv.classList.remove("slide-newname");
        edNameDiv.classList.add("slide-newname-back");
    });
});
