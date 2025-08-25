import { SignupValidation } from "./validate.js";

//signup
const fullName = document.getElementById("fullName");
const userName = document.getElementById("userName");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");

const errorEmail = document.getElementById("errorEmail");

export function initRegister() {
  const submitRegister = document.getElementById("submitRegister");
  const resetForm = document.getElementById("resetForm");

  if (!submitRegister || !resetForm) return;

  submitRegister.addEventListener("click", (e) => {
    e.preventDefault();
    saveUserDetails();
  });

  resetForm.addEventListener("click", (e) => {
    e.preventDefault();
    resetFormInputs();
  });

  function saveUserDetails() {
    let name = fullName.value;
    let email = userName.value;
    let pwd = userPassword.value;
    let cpwd = confirmPassword.value;

    const validation = SignupValidation(name, email, pwd, cpwd);

    if (!validation.valid) {
      errorEmail.innerText = validation.message;
      errorEmail.style.display = "block";
      return;
    }

    const userDetails = {
      id: Date.now(),
      name: name,
      email: email,
      password: pwd,
    };

    const userList = JSON.parse(localStorage.getItem("userdetails")) || [];
    userList.push(userDetails);
    localStorage.setItem("userdetails", JSON.stringify(userList));

    alert("User registered successfully!");
    resetFormInputs();
  }

  function resetFormInputs() {
    document.getElementById("fullName").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("userPassword").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("errorEmail").style.display = "none";
  }
}
