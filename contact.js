const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const phonenumber = document.getElementById("number");
const topic = document.getElementById("topic"); // Updated to match the select field
const message = document.getElementById("message");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check phone number is valid (basic format validation)
function checkPhoneNumber(input) {
  const re = /^[0-9]{10,15}$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Phone number must be between 10 and 15 digits");
  }
}

// Check if a valid topic is selected
function checkTopic(input) {
  if (input.value === "") {
    showError(input, "Please select a topic");
  } else {
    showSuccess(input);
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Get field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset all success/error classes
  const formControls = form.querySelectorAll(".form-control");
  formControls.forEach((control) =>
    control.classList.remove("success", "error")
  );

  // Check required fields
  checkRequired([firstname, lastname, email, phonenumber, message]);

  // Check topic selection
  checkTopic(topic);

  // Check lengths of name fields
  checkLength(firstname, 2, 20);
  checkLength(lastname, 2, 20);

  // Validate email
  checkEmail(email);

  // Validate phone number
  checkPhoneNumber(phonenumber);

  // Check message length (optional)
  checkLength(message, 10, 500);

  // If no errors, proceed with form submission
  const hasErrors = form.querySelectorAll(".form-control.error").length > 0;
  if (!hasErrors) {
    form.submit(); // Submit the form (or you can replace with AJAX submission)
  }
});
