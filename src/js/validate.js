function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function SignupValidation(name, email, pwd, cpwd) {
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
