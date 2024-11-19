// Utility function to safely parse JSON
const safeJSONParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return null;
  }
};

// Function to calculate adjusted price based on size
const calculateAdjustedPrice = (basePrice, size) => {
  const sizeMultipliers = {
    'S': 1,
    'M': 1.05,
    'L': 1.1,
    'XL': 1.2
  };
  return basePrice * (sizeMultipliers[size] || 1);
};

// Function to calculate item subtotal
const calculateItemSubtotal = (quantity, adjustedPrice) => {
  return (quantity * adjustedPrice).toFixed(2);
};

// Function to get cart from localStorage
const getCart = () => {
  const cartString = localStorage.getItem("cart");
  return safeJSONParse(cartString) || [];
};

// Function to set cart in localStorage
const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const updateCartBadge = () => {
  const cart = getCart();
  const totalQuantity = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  
  const cartBadge = document.querySelector(".cart-count");
  if (cartBadge) {
    cartBadge.textContent = totalQuantity;
    cartBadge.classList.toggle("hidden", totalQuantity === 0);
  }
};


const updateWalletDisplay = () => {
  const cart = getCart(); // Get the cart from localStorage
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.quantity * (item.adjustedPrice || item.price)); // Calculate the total price
  }, 0);

  const formattedPrice = totalPrice.toFixed(2); // Format the price to two decimal places
  const walletElement = document.querySelector(".wallet");  // Select the wallet element
  
  if (walletElement) {
    walletElement.textContent = `$${formattedPrice}`;  // Update the wallet with the formatted price
  }
};

// Function to update the total price in the checkout page
const updateTotalPrice = () => {
  const cart = getCart();
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.quantity * (item.adjustedPrice || item.price));
  }, 0);

  const formattedPrice = totalPrice.toFixed(2);
  const totalPriceElement = document.querySelector(".total-price");
  if (totalPriceElement) {
    totalPriceElement.innerHTML = `
      <div class="flex justify-between items-center border-t pt-4 mt-4">
        <span class="text-lg">Total:</span>
        <span class="text-xl font-bold">$${formattedPrice}</span>
      </div>
    `;
  }
};

// Function to add product to cart
const addToCart = (product) => {
  const cart = getCart();
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      size: 'S',
      adjustedPrice: parseFloat(product.price),
    });
  }

  setCart(cart);
  updateCartBadge();
  updateWalletDisplay();
  updateTotalPrice();
};

// Function to handle 'Add to Cart' button click
const handleAddToCart = (event) => {
  const button = event.target.closest('.add-to-cart-btn');
  if (!button) return;

  const product = {
    id: button.getAttribute('data-product-id'),
    title: button.getAttribute('data-title'),
    price: parseFloat(button.getAttribute('data-price')),
    image: button.getAttribute('data-image'),
    description: button.getAttribute('data-description') || '',
  };

  addToCart(product);
};

// Event delegation for 'Add to Cart' buttons
document.addEventListener('click', handleAddToCart);

// Initialize cart display on page load
document.addEventListener("DOMContentLoaded", () => {
  const cart = getCart();
  const cartContainer = document.querySelector(".cart-container");
  const totalPriceElement = document.querySelector(".total-price");
  const cartBadge = document.querySelector(".cart-count");

  // Function to handle empty cart state
  const handleEmptyCart = () => {
    cartContainer.innerHTML = `
      <div class="text-center py-8">
        <p class="text-gray-500 text-lg">Your cart is empty</p>
        <a href="./category.html" class="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Continue Shopping
        </a>
      </div>
    `;
  };

  // Function to render cart items
  const renderCart = () => {
    cartContainer.innerHTML = "";
    if (!cart.length) {
      handleEmptyCart();
      return;
    }

    let totalPrice = 0;

    cart.forEach((product) => {
      const { id, title, description, image, quantity, size, adjustedPrice } = product;

      const productCard = document.createElement("div");
      productCard.classList.add("product-card", "flex", "items-center", "justify-between", "border-b", "pb-4", "mb-4");
      productCard.setAttribute("data-id", id);

      productCard.innerHTML = `
        <div class="flex items-center">
          <img src="${image}" alt="${title}" class="w-16 h-16 object-cover mr-4">
          <div>
            <h3 class="font-medium">${title}</h3>
            <p class="text-gray-500">${description}</p>
            <p class="text-gray-700">Price: $<span class="adjusted-price">${adjustedPrice.toFixed(2)}</span></p>
            <p class="text-gray-700">Subtotal: $<span class="subtotal">${calculateItemSubtotal(quantity, adjustedPrice)}</span></p>
          </div>
        </div>
        <div class="flex items-center">
          <select class="size-select border rounded px-2 py-1">
            <option value="S" ${size === "S" ? "selected" : ""}>S</option>
            <option value="M" ${size === "M" ? "selected" : ""}>M</option>
            <option value="L" ${size === "L" ? "selected" : ""}>L</option>
            <option value="XL" ${size === "XL" ? "selected" : ""}>XL</option>
          </select>
          
          <div class="flex items-center border rounded ml-4">
            <button class="quantity-decrease px-3 py-1 text-gray-600 hover:bg-gray-100 border-r">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
              </svg>
            </button>
            <span class="quantity-display px-4 py-1">${quantity}</span>
            <button class="quantity-increase px-3 py-1 text-gray-600 hover:bg-gray-100 border-l">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </button>
          </div>
          
          <button class="remove-item ml-4 text-gray-500 hover:text-red-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      `;

      cartContainer.appendChild(productCard);

      totalPrice += quantity * adjustedPrice;

      // Add event listeners
      productCard.querySelector(".size-select").addEventListener("change", (event) => {
        const idx = cart.findIndex(item => item.id === id);
        cart[idx].size = event.target.value;
        cart[idx].adjustedPrice = calculateAdjustedPrice(cart[idx].price, cart[idx].size);
        setCart(cart);
        renderCart();
        updateWalletDisplay();
        updateTotalPrice();
      });

      productCard.querySelector(".quantity-decrease").addEventListener("click", () => {
        const idx = cart.findIndex(item => item.id === id);
        if (cart[idx].quantity > 1) {
          cart[idx].quantity -= 1;
          setCart(cart);
          renderCart();
          updateWalletDisplay();
          updateTotalPrice();
        }
      });

      productCard.querySelector(".quantity-increase").addEventListener("click", () => {
        const idx = cart.findIndex(item => item.id === id);
        cart[idx].quantity += 1;
        setCart(cart);
        renderCart();
        updateWalletDisplay();
        updateTotalPrice();
      });

      productCard.querySelector(".remove-item").addEventListener("click", () => {
        removeProduct(id);
      });
    });

    updateWalletDisplay();
    updateTotalPrice();
  };

  // Function to remove product with animation
  const removeProduct = (id) => {
    const productCard = document.querySelector(`[data-id="${id}"]`);
    if (productCard) {
      productCard.style.transition = 'all 0.3s ease-out';
      productCard.style.opacity = '0';
      productCard.style.transform = 'translateX(20px)';
      
      setTimeout(() => {
        const index = cart.findIndex((item) => item.id === id);
        if (index !== -1) {
          cart.splice(index, 1);
          setCart(cart);
          renderCart();
          updateWalletDisplay();
          updateTotalPrice();
        }
      }, 300);
    }
  };

  renderCart();
  updateCartBadge();
  updateWalletDisplay();
  updateTotalPrice();
});



// Expose necessary functions for external use
window.addToCart = addToCart;
window.updateCartBadge = updateCartBadge;
window.updateTotalPrice = updateTotalPrice;
window.updateWalletDisplay = updateWalletDisplay;