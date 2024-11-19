// Utility Functions
const safeJSONParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return [];
  }
};

// Cart State Management
const getCart = () => safeJSONParse(localStorage.getItem("cart"));
const setCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

// Price Calculations
const calculateAdjustedPrice = (basePrice, size) => {
  const sizeMultipliers = { 'S': 1, 'M': 1.05, 'L': 1.1, 'XL': 1.2 };
  return basePrice * (sizeMultipliers[size] || 1);
};

const calculateTotals = (cart) => {
  return cart.reduce((totals, item) => {
    const quantity = parseInt(item.quantity) || 0;
    const price = parseFloat(item.adjustedPrice || item.price) || 0;
    const subtotal = price * quantity;
    
    return {
      quantity: totals.quantity + quantity,
      price: totals.price + subtotal
    };
  }, { quantity: 0, price: 0 });
};

// UI Updates
const updateNavbarDisplays = () => {
  const cart = getCart();
  const { quantity, price } = calculateTotals(cart);

  // Update cart badges
  document.querySelectorAll(".cart-count").forEach(badge => {
    if (badge) {
      badge.textContent = quantity;
      badge.classList.toggle("hidden", quantity === 0);
    }
  });

  // Update wallet displays
  document.querySelectorAll(".wallet").forEach(element => {
    if (element) {
      element.textContent = `$${price.toFixed(2)}`;
    }
  });
};

// Cart Item Management
const addToCart = (product) => {
  if (!product?.id) {
    console.error("Invalid product data:", product);
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity = (parseInt(existingItem.quantity) || 0) + 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      size: 'S',
      adjustedPrice: calculateAdjustedPrice(parseFloat(product.price) || 0, 'S')
    });
  }

  setCart(cart);
  updateNavbarDisplays();
  renderCheckoutCart(); // Only updates if on checkout page
};

const updateCartItem = (id, updates) => {
  const cart = getCart();
  const item = cart.find(item => item.id === id);
  
  if (item) {
    Object.assign(item, updates);
    if (updates.size) {
      item.adjustedPrice = calculateAdjustedPrice(item.price, updates.size);
    }
    setCart(cart);
    updateNavbarDisplays();
    renderCheckoutCart();
  }
};

const removeCartItem = (id) => {
  const cart = getCart();
  const index = cart.findIndex(item => item.id === id);
  
  if (index !== -1) {
    const productCard = document.querySelector(`[data-id="${id}"]`);
    if (productCard) {
      productCard.style.transition = 'all 0.3s ease-out';
      productCard.style.opacity = '0';
      productCard.style.transform = 'translateX(20px)';
      
      setTimeout(() => {
        cart.splice(index, 1);
        setCart(cart);
        updateNavbarDisplays();
        renderCheckoutCart();
      }, 300);
    } else {
      cart.splice(index, 1);
      setCart(cart);
      updateNavbarDisplays();
      renderCheckoutCart();
    }
  }
};

// Checkout Page Rendering
const renderCheckoutCart = () => {
  const cartContainer = document.querySelector(".cart-container");
  if (!cartContainer) return; // Not on checkout page

  const cart = getCart();
  
  if (!cart.length) {
    cartContainer.innerHTML = `
      <div class="text-center py-12">
        <p class="text-gray-500 text-lg mb-4">Your shopping cart is empty</p>
        <a href="./category.html" class="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Continue Shopping
        </a>
      </div>
    `;
    return;
  }

  const { quantity, price } = calculateTotals(cart);
  
  cartContainer.innerHTML = `
    <div class="mb-6 pb-4 border-b">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold">Shopping Cart</h2>
        <p class="text-gray-600">${quantity} items in your cart</p>
      </div>
    </div>
    ${cart.map(item => `
      <div class="product-card flex items-center justify-between border-b py-4" data-id="${item.id}">
        <div class="flex items-center flex-1">
          <div class="w-24 h-24 rounded-lg overflow-hidden mr-6">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover">
          </div>
          <div class="flex-1">
            <h3 class="font-medium text-lg mb-1">${item.title}</h3>
            <p class="text-gray-500 text-sm mb-2">${item.description || ''}</p>
            <div class="flex items-center gap-4 text-sm text-gray-700">
              <p>Price: <span class="font-medium">$${item.adjustedPrice.toFixed(2)}</span></p>
              <p>Subtotal: <span class="font-medium">$${(item.quantity * item.adjustedPrice).toFixed(2)}</span></p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <select class="size-select border rounded-lg px-3 py-2 bg-white" data-id="${item.id}">
            ${['S', 'M', 'L', 'XL'].map(size => 
              `<option value="${size}" ${item.size === size ? 'selected' : ''}>${size}</option>`
            ).join('')}
          </select>
          <select class="quantity-select border rounded-lg px-3 py-2 bg-white" data-id="${item.id}">
            ${Array.from({ length: 10 }, (_, i) => i + 1).map(num => 
              `<option value="${num}" ${item.quantity === num ? 'selected' : ''}>${num}</option>`
            ).join('')}
          </select>
          <button class="remove-item text-gray-400 hover:text-red-500 transition-colors p-2" data-id="${item.id}">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    `).join('')}
    <div class="mt-6 pt-4 border-t">
      <div class="flex justify-end">
        <div class="w-72">
          <div class="flex justify-between items-center mb-2">
            <span class="text-gray-600">Subtotal:</span>
            <span class="font-medium">$${price.toFixed(2)}</span>
          </div>
          <div class="flex justify-between items-center text-lg">
            <span class="text-gray-900 font-medium">Total:</span>
            <span class="text-xl font-bold">$${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add event listeners for checkout page controls
  cartContainer.addEventListener('change', (e) => {
    const target = e.target;
    const id = target.dataset.id;
    
    if (target.classList.contains('size-select')) {
      updateCartItem(id, { size: target.value });
    } else if (target.classList.contains('quantity-select')) {
      updateCartItem(id, { quantity: parseInt(target.value) });
    }
  });

  cartContainer.addEventListener('click', (e) => {
    const removeButton = e.target.closest('.remove-item');
    if (removeButton) {
      removeCartItem(removeButton.dataset.id);
    }
  });
};

// Event Handlers
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateNavbarDisplays();
  renderCheckoutCart();
  document.addEventListener('click', handleAddToCart);
});

// Export necessary functions
window.addToCart = addToCart;
window.updateNavbarDisplays = updateNavbarDisplays;
window.renderCheckoutCart = renderCheckoutCart;