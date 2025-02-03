// =========================
// LOGIN (CLIENT-SIDE) VALIDATION SCRIPT
// =========================
// This script contains the client-side form validation JS functions for the
// login of the message board application. It includes the validation function
// definitions and event listener application.
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
  const passwordInput = document.getElementById("password");

  function toggleSubmitButton() {
    const errors = document.querySelectorAll(".error-message:not(:empty)");
    const allFieldsFilled = usernameInput.value.trim() && passwordInput.value;

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

  function validatePassword() {
    if (passwordInput.value.length < 6) {
      showError(passwordInput, "Password must be at least 6 characters.");
    } else {
      clearError(passwordInput);
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
  username.addEventListener("input", function () {
    if (this.classList.contains("input-error")) {
      validateUsername();
    }
  });

  passwordInput.addEventListener("blur", validatePassword);
  passwordInput.addEventListener("input", function () {
    if (this.classList.contains("input-error")) {
      validatePassword();
    }
  });

  // Failsafe submit event listener in case of toggleSubmitButton failure
  form.addEventListener("submit", function (event) {
    validateUsername();
    validatePassword();

    const errors = document.querySelectorAll(".error-message:not(:empty)");
    if (errors.length > 0) {
      event.preventDefault();
    }
  });

  toggleSubmitButton();
});
