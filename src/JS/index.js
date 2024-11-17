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
  

  let categoriesCont = document.querySelector(".categoriesContainer");
let categoriList = document.querySelector(".category_list");
let filterSelect = document.querySelector(".filterSelect");
let selectList = document.querySelector(".selectList");
let data = [];
let products = [];
let uniqueCategorie = [];

const createRatingStars = (rating) => {
  const starLength = Math.fround(rating);

  let stars = ``;
  for (let i = 0; i < starLength; i++) {
    stars += '<img src="../Assets/Images/start.png" alt="star" />';
  }
  return stars;
};

const clearFilter = () => {
  removeOpenFromAll();
  RenderCards(products);
};

const RenderListCat = () => {
  const categories = new Set();
  products.forEach((ele) => categories.add(ele.category));

  uniqueCategorie = Array.from(categories);

  let categoryItems = "";
  let selectItems = "";
  uniqueCategorie.forEach((cat, idx) => {
    categoryItems += `<li id='select-${idx}' onClick="onSelectCat(${idx})" class="hover:bg-white font-bold px-3 cursor-pointer py-1 rounded-lg">${cat}</li>`;
    selectItems += `<li id='select-${idx}' onclick="onSelectCat(${idx})" class="hover:bg-gray-200 transition cursor-pointer p-2 ">${cat}</li>`;
  });
  const AllProductlist = ` <li onclick="clearFilter()" class="hover:bg-white font-bold px-3 cursor-pointer py-1 rounded-lg">All</li>`;
  const AllProductSelect = `<li onclick="clearFilter()" class="hover:bg-gray-200 transition cursor-pointer p-2 ">All</li>`;

  categoriList.innerHTML = AllProductlist;
  categoriList.innerHTML += categoryItems;
  selectList.innerHTML = AllProductSelect;
  selectList.innerHTML += selectItems;
  console.log(selectList)
};

const RenderCards = async (newData) => {
  if (newData && newData.length >= 1) {
    data = newData;
  } else if (!data.length) {
    const res = await fetch(
      "https://yc-products-store.vercel.app/?vercelToolbarCode=ecNXJ0KhrTR7eLt"
    );
    let response = await res.json();
    data = response.products;
    products = data;
  }

  categoriesCont.innerHTML = "";

  for(let i = 0;i< 4;i++){
    categoriesCont.innerHTML += `
    <div
      class="card w-full flex flex-col justify-between rounded-3xl px-3 py-4 text-white h-[330px] lg:h-[400px] overflow-hidden"
    >
    <div class="h-56 flex items-center justify-center">
      <img
        src="${data[i].image || "../Assets/Images/t-shirt-placeholder.png"}"
        alt=""
        class="w-44 lg:w-52 max-h-full mx-auto mt-4 rounded-md"
      />
    </div>
      <div>
        <h1 class="text-lg md:text-xl font-bold text-white mt-3">${
          data[i].title
        }</h1>
        <div class="flex items-center gap-x-1 mt-2 ">
          ${createRatingStars(data[i].stars)}
        </div>
      </div>
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-xs md:text-xl">${data[i].price}$</h3>
        <button
          class="flex items-center gap-x-2 md:gap-x-4 px-2 py-1 text-sm rounded-xl text-black font-bold bg-white"
        >
          <span class="-mt-1
           text-xs md:text-base"> Add To Cart </span>
          <i class="fa-solid fa-cart-shopping text-xs m-0"></i>
        </button>
      </div>
    </div>
  `;
  }
 
  if (!newData) {
    RenderListCat();
  }
};

RenderCards();

const openToggleFilterSelect = () => {
  filterSelect.toggleAttribute("open");
};

const onSelectCat = (index) => {
  const categoryListItem = document.querySelector(
    `.category_list li#select-${index}`
  );
  const selectListItem = document.querySelector(
    `.selectList li#select-${index}`
  );

  removeOpenFromAll();
  if (categoryListItem) categoryListItem.classList.add("selected");
  if (selectListItem) selectListItem.classList.add("selected");

  filterSelect.toggleAttribute("open", false);

  const selectedCategory =
    categoryListItem?.textContent || selectListItem?.textContent;
  const newArr = products.filter((item) => item.category === selectedCategory);

  RenderCards(newArr);
};

const removeOpenFromAll = () => {
  document
    .querySelectorAll(".category_list li, .selectList li")
    .forEach((item) => {
      item.classList.toggle("selected", false);
    });
};
