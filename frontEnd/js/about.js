// Add event listener to the aboutButton
document.getElementById("aboutButton").addEventListener("click", function () {
    var aboutDiv = document.querySelector(".about");
    var container = document.querySelector(".container");
    if (aboutDiv.classList.contains("slide-about")) {
        aboutDiv.classList.remove("slide-about");
        aboutDiv.classList.add("slide-about-back");
        container.classList.remove("container-shift"); // Move the container back to its original position
    } else {
        aboutDiv.classList.remove("slide-about-back");
        aboutDiv.classList.add("slide-about");
        container.classList.add("container-shift"); // Move the container towards the left
    }
});

// Add event listener to handle clicks outside the about div
document.addEventListener("click", function(event) {
    var isClickInside = document.querySelector(".about").contains(event.target);
    var aboutDiv = document.querySelector(".about");
    var aboutButton = document.getElementById("aboutButton");
    var container = document.querySelector(".container");
 
    // Check if the click is outside the about div and not on the about button
    if (!isClickInside && event.target !== aboutButton) {
        // If the about div is visible, hide it
        if (aboutDiv.classList.contains("slide-about")) {
            aboutDiv.classList.remove("slide-about");
            aboutDiv.classList.add("slide-about-back");
            container.classList.remove("container-shift"); // Move the container back to its original position
        }
    }
});
