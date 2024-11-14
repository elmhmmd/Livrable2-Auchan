const promo_items = document.querySelector(".promo-items")
const promo_products =document.querySelector(".promo_products")
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
    promo_items.innerHTML = "";
  
        promo_items.innerHTML += `
              <div class="grid grid-cols-3  p-8 grid-rows-2 gap-4 sm:grid-cols-4 ">
            <div class="promo-item  p-3 flex items-center  flex-col rounded-tl-[16px] rounded-bl-[16px] bg-cover bg-center  min-h-fit  col-span-2 row-span-2 ">
                <img class="w-1/4 my-2" src="../Assets/Images/60-sale.png" alt=" sale off 60%">
                <img class="w-3/6 mt-2" src="../Assets/Images/parfume.png" alt="parfume image">
                <div class=" w-[100%] mt-auto">

                    <div>
                        <h1 class=" sm:text-xl font-bold text-white mt-1">${data[4].title}</h1>
                        <div class="stars flex items-center sm:gap-x-1 mt-1">
                          ${createRatingStars(data[4].stars)}
                        </div>
                    </div>
                    <div class="flex w-[100%] justify-between ">
                        <h3 class="font-semibold self-end text-white sm:text-xl">${data[4].price}Dhs</h3>
                        <button class="flex items-center gap-x-1 md:gap-x-4 px-1 md:px-3 py-1 rounded-md text-black font-semibold md:font-bold text-sm md:text-xl  bg-white">
                          <span class=""> Add To Cart </span>
                          <i class="fa-solid fa-cart-shopping text-sm"></i>
                        </button>
                    </div>
                </div>



            </div>
            <div class=" item flex flex-col items-center rounded-tr-[16px] rounded-br-[16px] bg-cover sm:rounded-tr-none sm:rounded-br-none bg-center p-4">
                <img class="w-4/6 mt-2" src="${data[8].image || "../Assets/Images/t-shirt-placeholder.png"}" alt="parfume image">
                <div class=" w-[100%] mt-auto">

                    <div>
                        <h1 class=" lg:text-lg sm:text-[0.6rem] text-[8px] font-semibold  text-white mt-1">${data[8].title}</h1>
                        <div class="stars flex items-center sm:gap-x-1 mt-1">
                           ${createRatingStars(data[8].stars)}
                        </div>
                    </div>
                    <div class="flex justify-between w-[100%]">
                        <h3 class="sm:font-semibold self-end text-white text-[10px] lg:text-lg">${data[8].price}Dhs</h3>
                        <button class="flex sm:gap-x-1 md:gap-x-2 px-[3px] sm:px-1 items-center  rounded-md text-black sm:font-semibold   lg:text-lg  bg-white">
                          <span class="text-[6px] md:text-[10px] lg:text-md"> Add To Cart </span>
                          <i class="fa-solid fa-cart-shopping text-[5px]"></i>
                        </button>
                    </div>
                </div>

            </div>
            <div class=" item flex flex-col items-center rounded-tr-[16px] rounded-br-[16px] bg-cover bg-center p-4">
                <img class="w-4/6 mt-2" src="${data[5].image || "../Assets/Images/t-shirt-placeholder.png"}" alt="parfume image">
                <div class=" w-[100%] mt-auto">

                    <div>
                        <h1 class=" lg:text-lg sm:text-[0.6rem] text-[8px] font-semibold  text-white mt-1">${data[5].title}</h1>
                        <div class="stars flex items-center sm:gap-x-1 mt-1">
                          ${createRatingStars(data[5].stars)}
                        </div>
                    </div>
                    <div class="flex justify-between w-[100%]">
                        <h3 class="sm:font-semibold self-end text-white text-[10px] lg:text-lg">${data[5].price}Dhs</h3>
                        <button class="flex sm:gap-x-1 md:gap-x-2 px-[3px] sm:px-1 items-center  rounded-md text-black sm:font-semibold   lg:text-lg  bg-white">
                          <span class="text-[6px] md:text-[10px] lg:text-md"> Add To Cart </span>
                          <i class="fa-solid fa-cart-shopping text-[5px]"></i>
                        </button>
                    </div>
                </div>

            </div>
            <div class="item  flex-col items-center hidden sm:flex bg-cover bg-center  p-4">
                <img class="w-4/6 mt-2" src="${data[11].image  || "../Assets/Images/t-shirt-placeholder.png"}" alt="parfume image">
                <div class=" w-[100%] mt-auto">

                    <div>
                        <h1 class=" lg:text-lg sm:text-[0.6rem] text-[8px] font-semibold  text-white mt-1">${data[11].title}</h1>
                        <div class="stars flex items-center sm:gap-x-1 mt-1">
                        ${createRatingStars(data[11].stars)}
                        </div>
                    </div>
                    <div class="flex justify-between w-[100%]">
                        <h3 class="sm:font-semibold self-end text-white text-[10px] lg:text-lg">${data[11].price}Dhs</h3>
                        <button class="flex sm:gap-x-1 md:gap-x-2 px-[3px] sm:px-1 items-center  rounded-md text-black sm:font-semibold   lg:text-lg  bg-white">
                          <span class="text-[6px] md:text-[10px] lg:text-md"> Add To Cart </span>
                          <i class="fa-solid fa-cart-shopping text-[5px]"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="item flex-col items-center rounded-tr-[16px] rounded-br-[16px] hidden sm:flex bg-cover bg-center p-4">
                <img class="w-4/6 mt-2" src="${data[21].image  || "../Assets/Images/t-shirt-placeholder.png"}" alt="parfume image">
                <div class=" w-[100%] mt-auto">

                    <div>
                        <h1 class=" lg:text-lg sm:text-[0.6rem] text-[8px] font-semibold  text-white mt-1">${data[21].title}</h1>
                        <div class="stars flex items-center sm:gap-x-1 mt-1">
                        ${createRatingStars(data[21].stars)}
                        </div>
                    </div>
                    <div class="flex justify-between w-[100%]">
                        <h3 class="sm:font-semibold self-end text-white text-[10px] lg:text-lg">${data[21].price}Dhs</h3>
                        <button class="flex sm:gap-x-1 md:gap-x-2 px-[3px] sm:px-1 items-center  rounded-md text-black sm:font-semibold   lg:text-lg  bg-white">
                          <span class="text-[6px] md:text-[10px] lg:text-md"> Add To Cart </span>
                          <i class="fa-solid fa-cart-shopping text-[5px]"></i>
                        </button>
                    </div>
                </div>
            </div>
          </div>
      `;
     
  };
  RenderCards();



  const   RenderItems = async () => {
    const res = await fetch("http://localhost:3000/products");
    data = await res.json();
  
    // Set innerHTML to empty string before loop
    promo_products.innerHTML = "";
  
    data.map((ele) => {
      promo_products.innerHTML += `
            <div
        class="card w-full flex flex-col justify-between rounded-3xl px-3 py-4 text-white h-[330px] lg:h-[400px] overflow-hidden"
      >
        <img
          src="${ele.image || "../Assets/Images/t-shirt-placeholder.png"}"
          alt=""
          class="w-44 lg:w-52 mx-auto mt-4 rounded-md"
        />
        <div >
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
  RenderItems();

  //  ==> start of pagination section
let pagesindex = document.querySelector(".pagination").querySelectorAll("li")

let currentPage = 1;
let numberPages = 4;
let cardsPerPage = 8;

function activePage() {
    pagesindex.forEach((l) => {
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