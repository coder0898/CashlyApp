import "./style.css";

// DOM Element

//tab
const TabButtons = document.querySelectorAll(".tab-buttons .tab");
const TabContainers = document.querySelectorAll(" .content");

//signup
const fullName = document.getElementById("fullName");
const userName = document.getElementById("userName");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");

const errorEmail = document.getElementById("errorEmail");

const submitRegister = document.getElementById("submitRegister");
const resetForm = document.getElementById("resetForm");

//tab functionality
TabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabid = btn.dataset.tab;

    //removing existing active class from all tabs button
    TabButtons.forEach((btn) => btn.classList.remove("active"));

    TabContainers.forEach((content) => content.classList.remove("active"));

    TabContainers.forEach((content) => {
      const targetContent = content.dataset.tab;

      if (targetContent === tabid) {
        content.classList.add("active");
      }
    });

    btn.classList.add("active");
  });
});

//signup form

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function SignupValidation(name, email, pwd, cpwd) {
  if (
    name.trim() === "" &&
    email.trim() === "" &&
    pwd.trim() === "" &&
    cpwd.trim() === ""
  ) {
    console.log("Please enter valid details");
    return;
  }

  //checking email
  if (!isValidEmail(email)) {
    errorEmail.style.display = "block";
    errorEmail.style.color = "#FF2400";
    errorEmail.innerText = "Please enter valid email";
    userName.style.border = "2px solid #FF2400";
  }

  //comparing pwd and cpwd
  if (pwd !== cpwd) {
    console.log("Please enter same confirm password as above");
    return;
  }
}

let i = 0,
  userList = [];

function SaveLoginDetails() {
  let name = fullName.value;
  let email = userName.value;
  let password = userPassword.value;
  let cpwd = confirmPassword.value;

  //validate the inputs
  SignupValidation(name, email, password, cpwd);

  let userDetails = {
    id: Date.now(),
    name,
    email,
    password,
  };

  userList.push(userDetails);

  localStorage.setItem("userdetails", JSON.stringify(userList));
  alert("user added successfully");
  ResetInputs();
  i++;
}

submitRegister.addEventListener("click", (e) => {
  e.preventDefault();
  SaveLoginDetails();
});

function ResetInputs() {
  fullName.value = "";
  userName.value = "";
  userPassword.value = "";
  confirmPassword.value = "";
  errorEmail.value = "";
  userName.style.border = "1px solid #ccc;";
}

resetForm.addEventListener("click", (e) => {
  e.preventDefault();
  ResetInputs();
});
