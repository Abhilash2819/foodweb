const mobileMenu = document.getElementById("mobile-menu");
const navMenu = document.querySelector(".nav-menu");

mobileMenu.addEventListener("click", function () {
  mobileMenu.classList.toggle("active");
  navMenu.classList.toggle("active");

  const bars = document.querySelectorAll(".bar");
  if (navMenu.classList.contains("active")) {
    bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
    bars[1].style.opacity = "0";
    bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
  } else {
    bars[0].style.transform = "none";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "none";
  }
});

document.addEventListener("click", function (event) {
  if (
    !mobileMenu.contains(event.target) &&
    !navMenu.contains(event.target) &&
    navMenu.classList.contains("active")
  ) {
    mobileMenu.classList.remove("active");
    navMenu.classList.remove("active");

    const bars = document.querySelectorAll(".bar");
    bars[0].style.transform = "none";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "none";
  }
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.padding = "1rem 5%";
    navbar.style.boxShadow = "0 2px 15px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.padding = "1.5rem 5%";
    navbar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  }
});


let cartCount = 0;
const cartCountElement = document.querySelector(".cart-count");
function updateCartCount(count) {
  cartCount = count;
  cartCountElement.textContent = cartCount;

  
  localStorage.setItem("cartCount", cartCount);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedCartCount = localStorage.getItem("cartCount");
  if (savedCartCount) {
    updateCartCount(parseInt(savedCartCount));
  }
});
