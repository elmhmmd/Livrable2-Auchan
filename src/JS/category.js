

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
        class="card w-full flex flex-col justify-between rounded-3xl px-3 py-4 text-white h-[330px] lg:h-[400px] overflow-hidden"
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
            class="add-to-cart-btn flex items-center gap-x-2 md:gap-x-4 px-2 py-1 text-sm rounded-md text-black font-bold bg-white"
          data-product-id="${ele.id}">
            <span class="-mt-1
             text-xs md:text-base"> Add To Cart </span>
            <i class="fa-solid fa-cart-shopping text-xs m-0"></i>
          </button>
        </div>
      </div>
    `;
  });
};

RenderCards();