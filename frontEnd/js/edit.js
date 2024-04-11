document.getElementById("editButton").addEventListener("click", function () {
    var editDiv = document.querySelector(".edit");
    if (editDiv.classList.contains("slide-edit")) {
        editDiv.classList.remove("slide-edit");
        editDiv.classList.add("slide-edit-back");
    } else {
        editDiv.classList.remove("slide-edit-back");
        editDiv.classList.add("slide-edit");
    }
});
document.addEventListener("click", function(event) {
    var isClickInside = document.querySelector(".edit").contains(event.target);
    var editDiv = document.querySelector(".edit");
    var editButton = document.getElementById("editButton");

    // Check if the click is outside the edit div and not on the edit button
    if (!isClickInside && event.target !== editButton) {
        // If the edit div is visible, hide it
        if (editDiv.classList.contains("slide-edit")) {
            editDiv.classList.remove("slide-edit");
            editDiv.classList.add("slide-edit-back");
        }
    }
});
// Select all buttons inside the .edit div
var editButtons = document.querySelectorAll(".edit button");

// Add an event listener to each button
editButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        // Hide the .edit div
        var editDiv = document.querySelector(".edit");
        editDiv.classList.remove("slide-edit");
        editDiv.classList.add("slide-edit-back");
    });
});
