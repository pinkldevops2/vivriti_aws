  const dropdown = document.getElementById('customDropdown');
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const label = document.getElementById('dropdownLabel');
  const modal = document.getElementById("successModal");
  const closeBtn = document.getElementById("closeModal");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownLabel = document.getElementById("dropdownLabel");
  const form = document.querySelector("form");

  // ---------- DROPDOWN FUNCTIONALITY ----------
  toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
    toggle.setAttribute('aria-expanded', dropdown.classList.contains('open'));
  });

  // Select option & close dropdown
  dropdownMenu.addEventListener('click', (e) => {
    const item = e.target.closest('li');
    if (!item) return;

    label.textContent = item.textContent;
    dropdown.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });

  // Click outside to close dropdown
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ---------- TAB & CONTENT LOGIC ----------
  const tabOptions = {
    borrow: ["Corporates", "Financial Institutions"],
    invest: ["An Individual", "A Corporate Treasury", "A Family Office", "A Global Citizen"],
    advisory: ["Capital Raise", "Capital Markets", "Capital Structuring", "Risk Management", "Credit Ratings", "ESG and Climate"],
    tech: ["Mid Corporate Lending", "Supply Chain Finance", "Co-Lending", "Asset Management", "Common Capabilities"],
    other: ["General Enquiry"]
  };

  const tabs = document.querySelectorAll(".tab");

  function updateDropdown(options) {
    dropdownMenu.innerHTML = options
      .map(option => `<li>${option}</li>`)
      .join("");

    // Set default label
    if (options.length) {
      dropdownLabel.textContent = options[0];
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedTab = tab.dataset.tab;
      const options = tabOptions[selectedTab] || [];
      updateDropdown(options);
    });
  });

  // ---------- FORM VALIDATION HELPER FUNCTIONS ----------
  function showError(input, message) {
    input.classList.add("input-error");
    input.nextElementSibling.textContent = message;
  }

  function clearError(input) {
    input.classList.remove("input-error");
    input.nextElementSibling.textContent = "";
  }

  function validateDropdown() {
    // NOTE: Ensure "Capital Raise" is the intended default placeholder
    if (!dropdownLabel.textContent || dropdownLabel.textContent === "Capital Raise") {
      alert("Please select a service from the dropdown.");
      return false;
    }
    return true;
  }

  function validateName(input) {
  const name = input.value.trim();
  const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;

  if (!name) {
    showError(input, "Name is required");
    return false;
  }

  if (name.length < 3) {
    showError(input, "Name must be at least 3 characters");
    return false;
  }

  if (name.length > 50) {
    showError(input, "Name is too long");
    return false;
  }

  if (!nameRegex.test(name)) {
    showError(input, "Only letters allowed");
    return false;
  }

  clearError(input);
  return true;
}

function validatePhone(input) {
  const phone = input.value.trim().replace(/\D/g, "");
  const phoneRegex = /^[6-9]\d{9}$/;

  // 1. Check for empty input
  if (!phone) {
    showError(input, "Phone number is required");
    return false;
  }

  // 2. Check for standard format (starts with 6-9 and is 10 digits)
  if (!phoneRegex.test(phone)) {
    showError(input, "Enter valid 10-digit mobile number");
    return false;
  }

  // 3. Check for repetitive digits (e.g., 9999999999)
  if (/^(\d)\1{9}$/.test(phone)) {
    showError(input, "Invalid phone number");
    return false;
  }

  // Cleanup: Update the input field to show the sanitized number (digits only)
  input.value = phone;
  clearError(input);
  return true;
}

function validateEmail(input) {
  let email = input.value.trim().toLowerCase();
  // Improved regex for standard email validation
  const emailRegex = /^[a-z0-9]+([._%+-]?[a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/;

  if (!email) {
    showError(input, "Email is required");
    return false;
  }

  if (email.length > 254) {
    showError(input, "Email is too long");
    return false;
  }

  if (/\s/.test(email)) {
    showError(input, "Spaces are not allowed");
    return false;
  }

  if (email.includes("..")) {
    showError(input, "Invalid email format");
    return false;
  }

  if (!emailRegex.test(email)) {
    showError(input, "Enter a valid email");
    return false;
  }

  // Sanitize the input field with the trimmed/lowercased version
  input.value = email;
  clearError(input);
  return true;
}

  // ---------- FORM SUBMISSION ----------
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateDropdown()) return;

    const nameInput = form.querySelector('input[placeholder="Name*"]');
    const phoneInput = form.querySelector('input[placeholder="Phone*"]');
    const emailInput = form.querySelector('input[placeholder="Email*"]');
    const messageInput = form.querySelector('input[placeholder="Message*"]');

    const isNameValid = validateName(nameInput);
    const isPhoneValid = validatePhone(phoneInput);
    const isEmailValid = validateEmail(emailInput);
    const isMessageValid = messageInput.value.trim() !== "" || (showError(messageInput, "Message is required"), false);

    if (isMessageValid) clearError(messageInput);

    if (!isNameValid || !isPhoneValid || !isEmailValid || !isMessageValid) return;

    // ✅ SUCCESS
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    form.reset();
    dropdownLabel.textContent = "Capital Raise"; // Reset dropdown to default
  });

  // Clear error on typing
  form.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      if (input.nextElementSibling?.classList.contains("error-text")) {
        clearError(input);
      }
    });
  });

  // ---------- MOBILE DROPDOWN & URL HANDLING ----------
  function activateSegment(key) {
    const options = tabOptions[key] || [];
    updateDropdown(options);
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.tab === key);
    });
  }

  const segmentSelect = document.getElementById("segmentSelect");
  if (segmentSelect) {
    segmentSelect.addEventListener("change", (e) => {
      activateSegment(e.target.value);
    });
  }

  function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }

  const segmentFromUrl = getQueryParam("segment");
  if (segmentFromUrl && tabOptions[segmentFromUrl]) {
    activateSegment(segmentFromUrl);
    if (segmentSelect) segmentSelect.value = segmentFromUrl;
  } else {
    // Default to the first option if no URL param
    activateSegment("borrow");
  }

  // ---------- MODAL CLOSE ----------
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });