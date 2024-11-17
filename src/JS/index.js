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


document.addEventListener('DOMContentLoaded', function () {
    const sections = [
      document.getElementById('grid-section1'),
      document.getElementById('grid-section2'),
      document.getElementById('grid-section3')
    ];
  
    const pageButtons = [
      document.getElementById('page1'),
      document.getElementById('page2'),
      document.getElementById('page3')
    ];
  
    
    function updatePagination(pageIndex) {
     
      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.add('hidden');
      }
  
     
      sections[pageIndex].classList.remove('hidden');
  
     
      for (let i = 0; i < pageButtons.length; i++) {
        pageButtons[i].classList.remove('bg-black');
        pageButtons[i].classList.add('bg-[#D7D8E3]');
      }
  
      pageButtons[pageIndex].classList.add('bg-black');
      pageButtons[pageIndex].classList.remove('bg-[#D7D8E3]');
    }
  
 
    pageButtons.forEach((button, index) => {
      button.addEventListener('click', function () {
        updatePagination(index); 
      });
    });
  
    updatePagination(0);
  });
  