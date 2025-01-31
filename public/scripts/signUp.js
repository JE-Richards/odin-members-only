// =========================
// SIGN UP (CLIENT-SIDE) VALIDATION SCRIPT
// =========================
// This script contains the client-side form validation JS functions for the
// message board application. It includes the validation function definitions
// and event listener application.
//
// Sections:
// 1. Set up
// 2. Validation functions
// 3. Event listeners
// =========================

// =========================
// 1. SET UP
// =========================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitButton = document.querySelector("button[type='submit']");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  function toggleSubmitButton() {
    const errors = document.querySelectorAll(".error-message:not(:empty)");
    const allFieldsFilled =
      usernameInput.value.trim() &&
      emailInput.value.trim() &&
      passwordInput.value &&
      confirmPasswordInput.value;
    submitButton.disabled = errors.length > 0 || !allFieldsFilled;
  }

  function showError(input, message) {
    const errorDiv = document.getElementById(`${input.id}-error`);
    errorDiv.textContent = message;
    input.classList.add("input-error");
    toggleSubmitButton();
  }

  function clearError(input) {
    const errorDiv = document.getElementById(`${input.id}-error`);
    errorDiv.textContent = "";
    input.classList.remove("input-error");
    toggleSubmitButton();
  }

  // =========================
  // 2. VALIDATION FUNCTIONS
  // =========================
  function validateUsername() {
    const username = usernameInput.value.trim();
    const usernameRegex = /^[a-zA-Z0-9_-]+$/; // Allow letters, numbers, underscores, and dashes only
    if (username.length < 3) {
      showError(usernameInput, "Username must be at least 3 characters.");
    } else if (!usernameRegex.test(username)) {
      showError(
        usernameInput,
        "Username can only contain letters, numbers, underscores (_), and dashes (-)."
      );
    } else {
      clearError(usernameInput);
    }
  }

  function validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, "Please enter a valid email address.");
    } else {
      clearError(emailInput);
    }
  }

  function validatePassword() {
    if (passwordInput.value.length < 6) {
      showError(passwordInput, "Password must be at least 6 characters.");
    } else {
      clearError(passwordInput);
    }
  }

  function validateConfirmPassword() {
    if (confirmPasswordInput.value !== passwordInput.value) {
      showError(confirmPasswordInput, "Passwords do not match.");
    } else {
      clearError(confirmPasswordInput);
    }
  }

  // =========================
  // 3. EVENT LISTENERS
  // =========================
  // The event listeners are designed to be less intrusive from a user
  // experience point of view. They first trigger after `blur`, then if an
  // error already exists, it will further trigger upon each input.
  // =========================
  usernameInput.addEventListener("blur", validateUsername);
  usernameInput.addEventListener("input", function () {
    if (this.classList.contains("input-error")) {
      validateUsername();
    }
  });

  emailInput.addEventListener("blur", validateEmail);
  emailInput.addEventListener("input", function () {
    if (this.classList.contains("input-error")) {
      validateEmail();
    }
  });

  passwordInput.addEventListener("blur", validatePassword);
  passwordInput.addEventListener("input", function () {
    if (this.classList.contains("input-error")) {
      validatePassword();
    }
  });

  confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
  confirmPasswordInput.addEventListener("input", function () {
    if (this.classList.contains("input-error")) {
      validateConfirmPassword();
    }
  });

  // Failsafe form submit event listener in case of toggleSubmitButton failure
  form.addEventListener("submit", function (event) {
    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();

    const errors = document.querySelectorAll(".error-message:not(:empty)");
    if (errors.length > 0) {
      event.preventDefault();
    }
  });

  // Ensures correct initial button state on page load
  toggleSubmitButton();
});
