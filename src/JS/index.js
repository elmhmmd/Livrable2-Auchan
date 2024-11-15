const navLinks = document.querySelector(".nav-links")
document.querySelector(".burger-icon").addEventListener("click" , function () {
    navLinks.style.left= "0%";
})

document.querySelector(".close-icon").addEventListener("click", function () {
    navLinks.style.left= "-100%";
})







// Select elements
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const sliderContainer = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".sliderOne");

let currentSlide = 0; 


function updateSliderPosition() {
    const slideWidth = slides[0].offsetWidth;
    sliderContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    updateSlideVisibility();
}


prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = slides.length - 1; 
    }
    updateSliderPosition();
});


nextButton.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
    } else {
        currentSlide = 0; 
    }
    updateSliderPosition();
});


setInterval(() => {
    nextButton.click();
}, 4000); 


function updateSlideVisibility() {
    
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.style.visibility = "visible"; 
        } else {
            slide.style.visibility = "hidden"; 
        }
    });
}