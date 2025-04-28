document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuItems = document.querySelectorAll(".menu-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      this.classList.add("active");

      const category = this.dataset.category;

      menuItems.forEach((item) => {
        if (category === "all" || item.dataset.category === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCountElement = document.querySelector(".cart-count");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  updateCartCountDisplay();

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = parseFloat(this.dataset.price);

      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: id,
          name: name,
          price: price,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCountDisplay();

      this.classList.add("added");
      this.textContent = "Added ✓";

      setTimeout(() => {
        this.classList.remove("added");
        this.textContent = "Add to Cart";
      }, 1500);
    });
  });

  function updateCartCountDisplay() {
    const totalItems = cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    cartCountElement.textContent = totalItems;

    localStorage.setItem("cartCount", totalItems);
  }
});
