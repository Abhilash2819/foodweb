
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Render cart items
    renderCart();
    
    // Checkout button event
    checkoutBtn.addEventListener('click', function() {
      if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
      } else {
        window.location.href = 'checkout.html';
      }
    });
    
    // Function to render cart items
    function renderCart() {
      // Clear cart items container
      cartItemsContainer.innerHTML = '';
      
      // Check if cart is empty
      if (cart.length === 0) {
        cartEmptyMessage.style.display = 'block';
        updateCartSummary(0);
        return;
      }
      
      cartEmptyMessage.style.display = 'none';
      
      // Render each cart item
      cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
          <img src="https://source.unsplash.com/featured/?${encodeURIComponent(item.name)}" alt="${item.name}">
          <div class="cart-item-content">
            <div class="cart-item-header">
              <h3 class="cart-item-name">${item.name}</h3>
              <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <div class="quantity-controls">
              <button class="quantity-btn decrease" data-index="${index}">-</button>
              <span class="quantity">${item.quantity}</span>
              <button class="quantity-btn increase" data-index="${index}">+</button>
              <button class="remove-item" data-index="${index}">Remove</button>
            </div>
          </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
      });
      
      // Add event listeners to quantity buttons and remove buttons
      addCartEventListeners();
      
      // Update cart summary
      const subtotal = calculateSubtotal();
      updateCartSummary(subtotal);
      
      // Update cart count in navbar
      updateCartCount();
    }
    
    // Calculate subtotal
    function calculateSubtotal() {
      return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    }
    
    // Update cart summary
    function updateCartSummary(subtotal) {
      const deliveryFee = cart.length > 0 ? 3.99 : 0;
      const tax = subtotal * 0.085; // 8.5% tax
      const total = subtotal + deliveryFee + tax;
      
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
      taxElement.textContent = `$${tax.toFixed(2)}`;
      totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    // Add event listeners to cart items
    function addCartEventListeners() {
      // Decrease quantity buttons
      document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.dataset.index);
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            saveCartAndRender();
          }
        });
      });
      
      // Increase quantity buttons
      document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.dataset.index);
          cart[index].quantity += 1;
          saveCartAndRender();
        });
      });
      
      // Remove item buttons
      document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
          const index = parseInt(this.dataset.index);
          const cartItem = this.closest('.cart-item');
          
          // Add animation class
          cartItem.classList.add('removing');
          
          // Wait for animation to complete before removing from DOM
          setTimeout(() => {
            cart.splice(index, 1);
            saveCartAndRender();
          }, 500);
        });
      });
    }
    
    // Save cart to localStorage and re-render
    function saveCartAndRender() {
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
    
    // Update cart count in navbar
    function updateCartCount() {
      const cartCount = document.querySelector('.cart-count');
      const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
      
      cartCount.textContent = totalItems;
      localStorage.setItem('cartCount', totalItems);
    }
  });
  