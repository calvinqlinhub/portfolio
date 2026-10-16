const form = document.querySelector(".contact-form");
const fields = [...form.querySelectorAll("input, textarea")];
const status = form.querySelector(".form-status");

const updateLabel = (field) => {
  field.closest(".form-field").classList.toggle("has-value", field.value.trim() !== "");
};

const showError = (field) => {
  const wrapper = field.closest(".form-field");
  const message = wrapper.querySelector(".error-message");
  const empty = field.value.trim() === "";
  const invalidEmail = field.type === "email" && !field.validity.valid;

  wrapper.classList.toggle("has-error", empty || invalidEmail);
  field.setAttribute("aria-invalid", String(empty || invalidEmail));
  message.textContent = empty || invalidEmail ? "Sorry, invalid format here" : "";
  return !(empty || invalidEmail);
};

fields.forEach((field) => {
  updateLabel(field);
  field.addEventListener("input", () => {
    updateLabel(field);
    if (field.closest(".form-field").classList.contains("has-error")) showError(field);
  });
  field.addEventListener("blur", () => showError(field));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const valid = fields.map(showError).every(Boolean);

  if (!valid) {
    status.textContent = "";
    form.querySelector("[aria-invalid='true']")?.focus();
    return;
  }

  status.textContent = "Thanks! Your message is ready to send.";
  form.reset();
  fields.forEach(updateLabel);
});
