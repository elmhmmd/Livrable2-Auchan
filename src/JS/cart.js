const PRODUCTS_URL = "http://localhost:3000/products";
const CART_URL = "http://localhost:3000/cart";

// Cache product data and cart data
let products = [];
let cart = [];

// Utility to update the cart notification and price
const updateCartUI = () => {
  const cartCountElem = document.querySelector(".cart-count");
  const cartTotalElem = document.querySelector(".cart-total");

  // Calculate the total quantity and price
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Update the UI elements
  cartCountElem.textContent = totalQuantity;
  cartTotalElem.textContent = `$${totalPrice.toFixed(2)}`;

  // Show or hide the notification badge based on the quantity
  if (totalQuantity > 0) {
    cartCountElem.classList.remove("hidden");
  } else {
    cartCountElem.classList.add("hidden");
  }
};

// Fetch and initialize cart data
const fetchCart = async () => {
  try {
    const response = await fetch(CART_URL);
    if (response.ok) {
      cart = await response.json();
      updateCartUI();
    } else {
      console.error("Failed to fetch cart data.");
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};

// Add product to the cart
const addToCart = async (productId) => {
  const product = products.find((item) => item.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      // Update the quantity of the existing item
      existingItem.quantity += 1;
      try {
        await fetch(`${CART_URL}/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: existingItem.quantity }),
        });
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    } else {
      // Add the new item to the cart
      const newItem = { ...product, quantity: 1 };
      cart.push(newItem);
      try {
        await fetch(CART_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
      } catch (error) {
        console.error("Error adding new item to cart:", error);
      }
    }

    updateCartUI();
  }
};

// Render product cards
const RenderCards = async () => {
  const categoriesCont = document.querySelector(".categoriesContainer");

  try {
    const res = await fetch(PRODUCTS_URL);
    products = await res.json();

    categoriesCont.innerHTML = "";

    products.forEach((product) => {
      categoriesCont.innerHTML += `
        <div class="card w-full flex flex-col justify-between rounded-3xl px-3 py-4 text-white h-[330px] lg:h-[400px] overflow-hidden">
          <img
            src="${product.image || "../Assets/Images/t-shirt-placeholder.png"}"
            alt="${product.title}"
            class="w-44 lg:w-52 mx-auto mt-4 rounded-md"
          />
          <div>
            <h1 class="text-lg md:text-xl font-bold text-white mt-3">${product.title}</h1>
            <p class="text-sm text-gray-300 mt-1">${product.description || ""}</p>
          </div>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-xs md:text-xl">${product.price}$</h3>
            <button 
              class="add-to-cart-btn flex items-center gap-x-2 md:gap-x-4 px-2 py-1 text-sm rounded-md text-black font-bold bg-white"
              data-product-id="${product.id}">
              <span class="-mt-1 text-xs md:text-base">Add To Cart</span>
              <i class="fa-solid fa-cart-shopping text-xs m-0"></i>
            </button>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Event delegation for Add to Cart buttons
document.addEventListener("click", (event) => {
  if (event.target.closest(".add-to-cart-btn")) {
    const button = event.target.closest(".add-to-cart-btn");
    const productId = parseInt(button.getAttribute("data-product-id"));
    addToCart(productId);
  }
});

// Initialize page
RenderCards();
fetchCart();