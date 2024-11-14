

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

  // Set innerHTML to empty string before loop
  categoriesCont.innerHTML = "";

  data.map((ele) => {
    categoriesCont.innerHTML += `
      <div
        class="card w-full  flex-col justify-between rounded-3xl px-3 py-4 text-white h-[330px] lg:h-[400px] overflow-hidden"
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
  displayCards();

};
RenderCards();



//  ==> start of pagination section
let pagesindex = document.querySelector(".pagination").querySelectorAll("li")

let currentPage = 1;
let numberPages = 4;
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
  let cards = document.querySelectorAll(".card")
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


