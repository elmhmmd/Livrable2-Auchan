

let categoriesCont = document.querySelector(".categoriesContainer");

let data = []

const createRatingStars = (rating) => {
  const starLength = Math.fround(rating);
  
  let stars = ``;
  for (let i = 0; i < starLength; i++) {
    stars += '<img src="../Assets/Images/start.png" alt="star" />';
  }
  return stars;
}



const RenderCards = async () => {

  const res = await fetch("http://localhost:3000/products");
  data = await res.json();

  categoriesCont.classList.add("grid" , "grid-cols-2" , "mt-8" , "md:grid-cols-3" , "lg:grid-cols-4" , "gap-5" , "md:gap-x-10" , "lg:gap-x-20")
  display_grid.classList.add("text-gray-400")
  display_list.classList.remove("text-gray-400")

 console.log("this is working")
  // Set innerHTML to empty string before loop
  categoriesCont.innerHTML = "";

  data.map((ele) => {
    categoriesCont.innerHTML += `
      <div
        class="card product w-full  flex-col justify-between rounded-3xl px-3 py-4 text-white h-[330px] lg:h-[400px] overflow-hidden"
      >
        <img
          src="${ele.image || "../Assets/Images/t-shirt-placeholder.png"}"
          alt=""
          class="w-44 lg:w-52 mx-auto mt-4 rounded-md"
        />
        <div>
          <h1 class="text-lg md:text-xl font-bold text-white mt-3">${ele.title}</h1>
          <div class="flex items-center gap-x-1 mt-2 ">
            ${createRatingStars(ele.stars)}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-xs md:text-xl">${ele.price}$</h3>
          <button
            class="flex items-center gap-x-2 md:gap-x-4 px-2 py-1 text-sm rounded-md text-black font-bold bg-white"
          >
            <span class="-mt-1
             text-xs md:text-base"> Add To Cart </span>
            <i class="fa-solid fa-cart-shopping text-xs m-0"></i>
          </button>
        </div>
      </div>
    `;
  });

  cardsPerPage = 8;
  displayCards();

};
RenderCards();



//  ==> start of pagination section
let pagesindex = document.querySelector(".pagination").querySelectorAll("li")

let currentPage = 1;
let numberPages = 3;
let cardsPerPage = 8;

function activePage() {
    pagesindex.forEach((l, index) => {
        if (l.value == currentPage) {
            l.classList.remove("selected")
        }
    });
    event.target.classList.add("selected")
    currentPage= event.target.value;
    console.log(currentPage)
    displayCards(); 
}

function prevPage() {

    if (currentPage > 1) {
        pagesindex.forEach((l) => {
            if (l.value == currentPage) {
                l.classList.remove("selected")
            }
        });

        currentPage--;
        pagesindex.forEach((l) => {
            if (l.value == currentPage) {
                l.classList.add("selected")
            }
        });
        displayCards();
    }   
}
function nextPage() {

    if (currentPage < numberPages) {
        pagesindex.forEach((l) => {
            if (l.value == currentPage) {
                l.classList.remove("selected")
            }
        });

        currentPage++;
        pagesindex.forEach((l) => {
            if (l.value == currentPage) {
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

    console.log(cards.length)
    cards.forEach((item , index)=> {
        console.log(index+"mama")
        if ((index >= start) && (index <= end)) {
          item.classList.remove("hidden");
          item.classList.add("flex");
          console.log(item)
            // item.style.display = 'flex'
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
   cardsPerPage = 4;
  const res = await fetch("http://localhost:3000/products");
  data = await res.json();

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
            <button class="flex mt-3 px-3 py-[3px] gap-[4px] items-center self-end  rounded-md text-black font-semibold  bg-white sm:text-lg ">
              <span class=" text-sm sm:text-lg sm:font-bold"> Add To Cart </span>
              <i class="fa-solid fa-cart-shopping"></i> 
            </button>
          </div>

        </div>

    `;
  });
  displayCards();

};
// ==> End the function that display product in list 

// here goes the event listner to switche from list to grid 
// const display_list =document.querySelector(".display_list")
// const display_grid =document.querySelector(".display_grid")

// display_grid.addEventListener("click",RenderCards());
// display_list.addEventListener("click",toList())

// end of event listner to switche from list to grid 
 

