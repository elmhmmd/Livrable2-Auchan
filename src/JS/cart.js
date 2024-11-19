// Utility function to safely parse JSON
const safeJSONParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return [];  // Return empty array instead of null
  }
};

// Function to get cart from localStorage
const getCart = () => {
  const cartString = localStorage.getItem("cart");
  return safeJSONParse(cartString);
};

// Function to set cart in localStorage
const setCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Function to update cart badge count
const updateCartBadge = () => {
  const cart = getCart();
  const totalQuantity = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  
  // Query all cart count elements
  const cartBadges = document.querySelectorAll(".cart-count");
  cartBadges.forEach(badge => {
    if (badge) {
      badge.textContent = totalQuantity;
      badge.classList.toggle("hidden", totalQuantity === 0);
    }
  });
};

// Function to update wallet display
const updateWalletDisplay = () => {
  const cart = getCart();
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.adjustedPrice || item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return total + (itemPrice * quantity);
  }, 0);

  // Query all wallet elements
  const walletElements = document.querySelectorAll(".wallet");
  walletElements.forEach(element => {
    if (element) {
      element.textContent = `$${totalPrice.toFixed(2)}`;
    }
  });
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

// Function to add product to cart
const addToCart = (product) => {
  if (!product || !product.id) {
    console.error("Invalid product data:", product);
    return;
  }

  const cart = getCart();
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity = (parseInt(cart[existingProductIndex].quantity) || 0) + 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      size: 'S',
      adjustedPrice: parseFloat(product.price) || 0
    });
  }

  setCart(cart);
  updateCartBadge();
  updateWalletDisplay();
};

// Function to handle 'Add to Cart' button click
const handleAddToCart = (event) => {
  const button = event.target.closest('[data-product-id]');
  if (!button) return;

  const product = {
    id: button.dataset.productId,
    title: button.dataset.title || 'Untitled Product',
    price: parseFloat(button.dataset.price) || 0,
    image: button.dataset.image || '',
    description: button.dataset.description || ''
  };

  addToCart(product);
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Immediately update displays when page loads
  updateCartBadge();
  updateWalletDisplay();
  
  // Add event delegation for 'Add to Cart' buttons
  document.addEventListener('click', handleAddToCart);
});

// Expose necessary functions
window.addToCart = addToCart;
window.updateCartBadge = updateCartBadge;
window.updateWalletDisplay = updateWalletDisplay;