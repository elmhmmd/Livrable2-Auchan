const updateCartBadge = () => {
  // Get the cart from localStorage and parse it
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart:", cart);  // Log the cart to verify it exists

  // Calculate the total quantity by summing up all product quantities
  const totalQuantity = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
  console.log("Total Quantity:", totalQuantity);  // Log the total quantity

  // Get the cart badge element
  const cartBadge = document.querySelector(".cart-count");

  // Update the badge's visibility and text content based on the quantity
  if (cartBadge) {
    if (totalQuantity > 0) {
      cartBadge.textContent = totalQuantity;  // Set the total quantity in the badge
      cartBadge.classList.remove("hidden");  // Make the badge visible
    } else {
      cartBadge.textContent = "0";  // Clear the badge if no items
      cartBadge.classList.add("hidden");  // Hide the badge if quantity is 0
    }
  }
};





// Function to add product to localStorage
const addToCart = (product) => {
  // Get cart from localStorage or initialize an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    // If the product exists, increment the quantity
    cart[existingProductIndex].quantity += 1;
  } else {
    // If the product doesn't exist, add it to the cart
    cart.push({ 
      ...product, 
      quantity: 1, 
      size: 'S',  // Default size for all products
      adjustedPrice: parseFloat(product.price) // Default adjusted price is base price
    });
  }

  // Store the updated cart in localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log('Updated cart:', cart); // Debugging log
  updateCartBadge();
};

// Listen for click events on "Add to Cart" buttons
document.addEventListener('click', (event) => {
  // Check if the clicked element is an "Add to Cart" button
  if (event.target && event.target.classList.contains('add-to-cart-btn')) {
    // Get product data from the button's data attributes
    const product = {
      id: event.target.getAttribute('data-product-id'),
      title: event.target.getAttribute('data-title'),
      price: event.target.getAttribute('data-price'),
      image: event.target.getAttribute('data-image'),
      description: event.target.getAttribute('data-description') || '', // Optional description
    };

    // Add the product to the cart
    addToCart(product);

  }
});

