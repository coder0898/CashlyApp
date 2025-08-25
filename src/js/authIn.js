//login
const errorMsg = document.getElementById("errorMsg");
const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");

export function initLogin() {
  const submitLogin = document.getElementById("submitLogin");

  if (!submitLogin) return;

  submitLogin.addEventListener("click", (e) => {
    e.preventDefault();
    authenticateUser();
  });

  function authenticateUser() {
    const email = inputUsername.value.trim();
    const password = inputPassword.value.trim();

    if (!email || !password) {
      showError("Please enter login details");
      return;
    }

    const users = JSON.parse(localStorage.getItem("userdetails")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("loggedUser", JSON.stringify(user));
      window.location.href = "home.html";
    } else {
      showError("Login or password is incorrect");
    }

    function showError(msg) {
      errorMsg.innerText = msg;
      errorMsg.style.display = "block";
      errorMsg.style.color = "#B31B1B";
      errorMsg.style.backgroundColor = "#FF6347";
    }
  }
}
