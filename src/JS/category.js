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
  categoriesCont.classList.add("grid" , "grid-cols-2" , "mt-8" , "md:grid-cols-3" , "lg:grid-cols-4" , "gap-5" , "md:gap-x-10" , "lg:gap-x-20")
  display_grid.classList.add("text-gray-400")
  display_list.classList.remove("text-gray-400")

 

  categoriesCont.innerHTML = "";

  data.map((ele) => {
    categoriesCont.innerHTML += `
      <div
        class="card product w-full  flex-col justify-between rounded-3xl px-3 py-4 text-white h-[330px] lg:h-[400px] overflow-hidden"
      >
      <div class="h-56 flex items-center justify-center">
        <img
          src="${ele.image}"
        
          alt="this is an"
          class="w-44 lg:w-52 max-h-full mx-auto mt-4 rounded-md"
        />
      </div>
        <div>
          <h1 class="text-lg md:text-xl font-bold text-white mt-3">${
            ele.title
          }</h1>
          <div class="flex items-center gap-x-1 mt-2 ">
            ${createRatingStars(ele.stars)}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-xs md:text-xl">${ele.price}$</h3>
          <button
            class="add-to-cart-btn flex items-center gap-x-2 md:gap-x-4 px-2 py-1 text-sm rounded-md text-black font-bold bg-white"
          data-product-id="${ele.id}"data-title="${ele.title}"
            data-price="${ele.price}"
            data-image="${ele.image}"
            data-description="${ele.description || ''}"
            data-size="S">
            <span class="-mt-1
             text-xs md:text-base"> Add To Cart </span>
            <i class="fa-solid fa-cart-shopping text-xs m-0"></i>
          </button>
        </div>
      </div>
    `;
  });
  if (!newData) {
    RenderListCat();
  }

  cardsPerPage= 8;
  dynamicPagination(data)
  displayCards();

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




//  ==> start of pagination section
let pagesindex;
let currentPage = 1;
let numberPages;
let cardsPerPage;

function activePage(event) {
    pagesindex.forEach((l) => {
        if (l.dataset.value == currentPage) {
            l.classList.remove("selected")
        }
    });

    event.target.classList.add("selected")
    currentPage= event.target.dataset.value;
    
    displayCards(); 
}

function prevPage() {

    if (currentPage > 1) {
        pagesindex.forEach((l) => {
            if (l.dataset.value == currentPage) {
                l.classList.remove("selected")
            }
        });

        currentPage--;
        pagesindex.forEach((l) => {
            if (l.dataset.value == currentPage) {
                l.classList.add("selected")
            }
        });
        displayCards();
    }   
}
function nextPage() {

    if (currentPage < numberPages) {
        pagesindex.forEach((l) => {
            if (l.dataset.value == currentPage) {
                l.classList.remove("selected")
            }
        });

        currentPage++;
        pagesindex.forEach((l) => {
            if (l.dataset.value == currentPage) {
                l.classList.add("selected")
            }
        });

        displayCards();
    }   
}

function displayCards() {
  let cards = document.querySelectorAll(".product")
    let start = (currentPage-1)*cardsPerPage ;
    let end = currentPage*cardsPerPage - 1;

   
    cards.forEach((item , index)=> {
        
        if ((index >= start) && (index <= end)) {
          item.classList.remove("hidden");
          item.classList.add("flex");
        } else {
          item.classList.remove("flex");
          item.classList.add("hidden");
        }
    });
    
}



//  ==> end of pagination section

// ==> Start the function that display product in list 
const display_list =document.querySelector(".display_list")
const display_grid =document.querySelector(".display_grid")
const toList = async () => {
    const result = await fetch(
      "https://yc-products-store.vercel.app/?vercelToolbarCode=ecNXJ0KhrTR7eLt"
    );
    let response = await result.json();
    data = response.products;

  categoriesCont.classList.remove("grid" , "grid-cols-2" , "mt-8" , "md:grid-cols-3" , "lg:grid-cols-4" , "gap-5" , "md:gap-x-10" , "lg:gap-x-20")
  display_grid.classList.remove("text-gray-400")
  display_list.classList.add("text-gray-400")


  // Set innerHTML to empty string before loop
  categoriesCont.innerHTML = "";

  data.map((ele) => {
    categoriesCont.innerHTML += `
          <div class="product justify-between rounded-md my-6 bg-gray-200 p-4 max-w-[1000px] ">
          <div class="card rounded-md flex justify-center items-center w-[35%] lg: ">
            <img class="w-2/5 h-auto " src="${ele.image || "../Assets/Images/parfume.png"}" alt=" product image">
          </div>
          <div class="flex flex-col justify-center w-[60%]  gap-1 sm:gap-3  ">
            <h2 class="font-bold  sm:text-2xl md:text-3xl  ">${ele.title}</h2>
            <h3 class="font-semibold sm:text-xl md:text-2xl  ">${ele.price}$</h3>
            <div class="flex w-fit">
              ${createRatingStars(ele.stars)}  
            </div>
            <p class="text-sm md:text-lg   sm:text-base ">${ele.description}</p>
            <button class="add-to-cart-btn flex mt-3 px-3 py-[3px] gap-[4px] items-center self-end  rounded-md text-black font-semibold  bg-white sm:text-lg" data-product-id="${ele.id}" data-title="${ele.title}"
            data-price="${ele.price}"
            data-image="${ele.image}" 
            data-description="${ele.description || ''}"
            data-size="S">
              
              <span class=" text-sm sm:text-lg sm:font-bold"> Add To Cart </span>
              <i class="fa-solid fa-cart-shopping"></i> 
            </button>
          </div>

        </div>

    `;
  });
  cardsPerPage= 4;
  dynamicPagination(data)
  displayCards();

};
// ==> End the function that display product in list 

// Start of Dynamic Pagination Function

const dynamicPagination = (data)=> {

  numberPages = Math.ceil((data.length)/cardsPerPage);

  let pagination = document.querySelector(".pagination");
  let list = document.createElement("ul");
  list.classList.add("flex" , "items-center")

  list.innerHTML = `<li onclick="prevPage()" class="chevron fas fa-chevron-left  inline-block  py-[5px] cursor-pointer w-7 h-7 text-center align-middle transition-all duration-600 ease-in-out text-lg font-extrabold border-0 bg-transparent" data-value="previous"></li>`
  for (let i = 1; i <= numberPages; i++) {
    if (i == currentPage) {
      list.innerHTML += `<li onclick="activePage(event)" class="selected inline-block border-2 bg-white border-[#040418] rounded-full cursor-pointer w-7 h-7 text-center align-middle transition-all duration-600 ease-in-out" data-value="${i}">${i}</li>`
      
    } else{
      list.innerHTML += `<li onclick="activePage(event)" class="inline-block border-2 bg-white border-[#040418] rounded-full cursor-pointer w-7 h-7 text-center align-middle transition-all duration-600 ease-in-out" data-value="${i}">${i}</li>`
    }
  }
  list.innerHTML += `<li onclick="nextPage()" class="chevron fas fa-chevron-right inline-block  py-[5px] cursor-pointer w-7 h-7 text-center align-middle transition-all duration-600 ease-in-out text-lg font-extrabold border-0 bg-transparent " data-value="next"></li>`

  pagination.innerHTML = ` `;
  pagination.appendChild(list)

  pagesindex = document.querySelector(".pagination").querySelectorAll("li")

}
// End of Dynamic Pagination Function


