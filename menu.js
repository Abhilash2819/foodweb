
// Menu Item Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Filter menu items
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get category to filter by
        const category = this.dataset.category;
        
        // Filter menu items
        menuItems.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.querySelector('.cart-count');
    
    // Get cart from localStorage or create a new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count on page load
    updateCartCountDisplay();
    
    // Add to cart button click event
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
          });
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        updateCartCountDisplay();
        
        // Show visual feedback
        this.classList.add('added');
        this.textContent = 'Added ✓';
        
        // Reset button after a short delay
        setTimeout(() => {
          this.classList.remove('added');
          this.textContent = 'Add to Cart';
        }, 1500);
      });
    });
    
    // Function to update cart count display
    function updateCartCountDisplay() {
      const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
      
      cartCountElement.textContent = totalItems;
      
      // Update global cart count (for other pages)
      localStorage.setItem('cartCount', totalItems);
    }
  });
  