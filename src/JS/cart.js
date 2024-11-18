// Function to update the cart badge with total quantity of items
const updateCartBadge = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart:", cart); // Debugging log

  const totalQuantity = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  console.log("Total Quantity:", totalQuantity); // Debugging log

  const cartBadge = document.querySelector(".cart-count");

  if (cartBadge) {
    if (totalQuantity > 0) {
      cartBadge.textContent = totalQuantity;
      cartBadge.classList.remove("hidden");
    } else {
      cartBadge.textContent = "0";
      cartBadge.classList.add("hidden");
    }
  }
};

// Function to update the total price in the wallet
const updateTotalPrice = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart:", cart); // Debugging log

  const totalPrice = cart.reduce((total, item) => {
    return total + (item.quantity * item.adjustedPrice || item.price);
  }, 0);

  const formattedPrice = totalPrice.toFixed(2);
  const walletElement = document.querySelector(".total-price");

  if (walletElement) {
    walletElement.textContent = `$${formattedPrice}`;
  }
};

// Function to add product to the cart in localStorage
const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      size: 'S',  // Default size
      adjustedPrice: parseFloat(product.price), // Ensure adjustedPrice exists
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log('Updated cart:', cart); // Debugging log

  updateCartBadge();
  updateTotalPrice();
};

// Listen for click events on "Add to Cart" buttons
document.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('add-to-cart-btn')) {
    const product = {
      id: event.target.getAttribute('data-product-id'),
      title: event.target.getAttribute('data-title'),
      price: event.target.getAttribute('data-price'),
      image: event.target.getAttribute('data-image'),
      description: event.target.getAttribute('data-description') || '',
    };

    addToCart(product);
  }
});

// Ensure both updateCartBadge and updateTotalPrice are called when the page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  updateTotalPrice();
});
