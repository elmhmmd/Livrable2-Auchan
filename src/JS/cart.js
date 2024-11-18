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
    'M': 1.1,
    'L': 1.2,
    'XL': 1.3
  };
  return basePrice * (sizeMultipliers[size] || 1);
};

// Function to calculate item subtotal
const calculateItemSubtotal = (quantity, adjustedPrice) => {
  return (quantity * adjustedPrice).toFixed(2);
};

// Function to create quantity options
const createQuantityOptions = (currentQuantity) => {
  const options = [];
  for (let i = 1; i <= 10; i++) {
    options.push(`<option value="${i}" ${currentQuantity == i ? "selected" : ""}>${i}</option>`);
  }
  return options.join('');
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

// Function to update cart badge
const updateCartBadge = () => {
  const cart = getCart();
  const totalQuantity = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  
  const cartBadge = document.querySelector(".cart-count");
  if (cartBadge) {
    cartBadge.textContent = totalQuantity.toString();
    cartBadge.classList.toggle("hidden", totalQuantity === 0);
  }
};

// Function to update the total price in the wallet
const updateTotalPrice = () => {
  const cart = getCart();
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.quantity * (item.adjustedPrice || item.price));
  }, 0);

  const formattedPrice = totalPrice.toFixed(2);
  const walletElement = document.querySelector(".total-price");
  if (walletElement) {
    walletElement.textContent = `$${formattedPrice}`;
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
      productCard.classList.add("product-card", "flex", "items-center", "justify-between", "border-b", "pb-4");
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
          <select class="quantity-select border rounded px-2 py-1 ml-4">
            ${createQuantityOptions(quantity)}
          </select>
          <button class="remove-item ml-4 text-gray-500">
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
        product.size = event.target.value;
        product.adjustedPrice = calculateAdjustedPrice(product.price, product.size);
        setCart(cart);
        renderCart();
      });

      productCard.querySelector(".quantity-select").addEventListener("change", (event) => {
        product.quantity = parseInt(event.target.value, 10);
        setCart(cart);
        renderCart();
      });

      productCard.querySelector(".remove-item").addEventListener("click", () => {
        removeProduct(id);
      });
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    updateCartBadge();
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
        }
      }, 300);
    }
  };

  renderCart();
  updateCartBadge();
  updateTotalPrice();
});

// Expose necessary functions for external use
window.addToCart = addToCart;
window.updateCartBadge = updateCartBadge;
window.updateTotalPrice = updateTotalPrice;