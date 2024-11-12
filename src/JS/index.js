const navLinks = document.querySelector(".nav-links")
document.querySelector(".burger-icon").addEventListener("click" , function () {
    navLinks.style.left= "0%";
})

document.querySelector(".close-icon").addEventListener("click", function () {
    navLinks.style.left= "-100%";
})

