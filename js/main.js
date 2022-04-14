// Add listener
window.addEventListener("scroll", reveal);
document.querySelector("#navButon").addEventListener("click", showNav)

// Function for reveal
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowHeight - revealpoint) {
            reveals[i].classList.add("active");
        }
        else {
            reveals[i].classList.remove("active");
        }
    }
}

// Function for shownav
function showNav() {
    navOption = document.querySelector("#navOption")
    navOption.classList.toggle("hidden")
}

// Service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registraton => {
        // console.log("SW Registered!")
        // console.log(registraton)
    }).catch(error => {
        // console.log("SW Registration Failed!")
        // console.log(error)
    })
}

// Delete caches
caches.keys().then(function(names) {
    for (let name of names)
        caches.delete(name);
});