
document.addEventListener('DOMContentLoaded', function() {
    // Toggle Password Visibility
    const togglePassword = document.getElementById('toggle-password');
    if (togglePassword) {
      const passwordInput = document.getElementById('password');
      
      togglePassword.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          togglePassword.textContent = 'Hide';
        } else {
          passwordInput.type = 'password';
          togglePassword.textContent = 'Show';
        }
      });
    }
  
    // Password Validation for Sign Up
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    const passwordStrength = document.querySelector('.password-strength-bar');
  
    if (passwordField && confirmPasswordField) {
      // Check password strength when typing
      passwordField.addEventListener('input', function() {
        const password = passwordField.value;
        
        // Update password strength indicator if it exists
        if (passwordStrength) {
          updatePasswordStrength(password, passwordStrength);
        }
      });
  
      // Validate passwords match
      confirmPasswordField.addEventListener('input', function() {
        if (passwordField.value !== confirmPasswordField.value) {
          confirmPasswordField.classList.add('error');
          
          // Add error message if it doesn't exist
          let errorMessage = confirmPasswordField.nextElementSibling;
          if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.classList.add('error-message');
            errorMessage.textContent = 'Passwords do not match';
            confirmPasswordField.parentNode.insertBefore(errorMessage, confirmPasswordField.nextSibling);
          }
        } else {
          confirmPasswordField.classList.remove('error');
          
          // Remove error message if it exists
          const errorMessage = confirmPasswordField.nextElementSibling;
          if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
          }
        }
      });
    }
  
    // Form Submission for Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;
        
        // Here you would normally send this to a server
        console.log('Login attempt:', { email, password, rememberMe });
        
        // For demo purposes, simulate successful login
        alert('Login successful! Redirecting to homepage...');
        window.location.href = 'index.html';
      });
    }
  
    // Form Submission for Sign Up
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        
        if (!agreeTerms) {
          alert('You must agree to the Terms and Conditions');
          return;
        }
        
        // Here you would normally send this to a server
        console.log('Signup attempt:', { name, email, password, agreeTerms });
        
        // For demo purposes, simulate successful registration
        alert('Registration successful! Redirecting to login page...');
        window.location.href = 'login.html';
      });
    }
  
    // Function to update password strength indicator
    function updatePasswordStrength(password, element) {
      // Simple password strength calculation
      let strength = 0;
      
      // Length check
      if (password.length >= 8) {
        strength += 1;
      }
      
      // Contains numbers
      if (/\d/.test(password)) {
        strength += 1;
      }
      
      // Contains uppercase
      if (/[A-Z]/.test(password)) {
        strength += 1;
      }
      
      // Contains special characters
      if (/[^A-Za-z0-9]/.test(password)) {
        strength += 1;
      }
      
      // Update UI based on strength
      element.className = 'password-strength-bar';
      
      if (strength === 0) {
        element.style.width = '0';
      } else if (strength <= 2) {
        element.classList.add('strength-weak');
      } else if (strength === 3) {
        element.classList.add('strength-medium');
      } else {
        element.classList.add('strength-strong');
      }
    }
  });
  