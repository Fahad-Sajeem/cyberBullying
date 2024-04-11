document.getElementById("editpwd").addEventListener("click", function () {
    var edPwdDiv = document.querySelector(".ed_pwd");
    if (edPwdDiv.classList.contains("slide-newpwd")) {
        edPwdDiv.classList.remove("slide-newpwd");
        edPwdDiv.classList.add("slide-newpwd-back");
    } else {
        edPwdDiv.classList.remove("slide-newpwd-back");
        edPwdDiv.classList.add("slide-newpwd");
    }
});
document.addEventListener("click", function(event) {
    var isClickInside = document.querySelector(".ed_pwd").contains(event.target);
    var edPwdDiv = document.querySelector(".ed_pwd");
    var editpwdButton = document.getElementById("editpwd");

    // Check if the click is outside the edit name div and not on the edit name button
    if (!isClickInside && event.target !== editpwdButton) {
        // If the edit name div is visible, hide it
        if (edPwdDiv.classList.contains("slide-newpwd")) {
            edPwdDiv.classList.remove("slide-newpwd");
            edPwdDiv.classList.add("slide-newpwd-back");
        }
    }
});
// Select all buttons inside the .ed_pwd div
var edNameButtons = document.querySelectorAll(".ed_pwd button");

// Add an event listener to each button
edNameButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        // Hide the .ed_pwd div
        var edPwdDiv = document.querySelector(".ed_pwd");
        edPwdDiv.classList.remove("slide-newpwd");
        edPwdDiv.classList.add("slide-newpwd-back");
    });
});
