//log out
const logOutButton = document.getElementById("logOutButton");

export function initLogout() {
  const logOutButton = document.getElementById("logOutButton");

  if (logOutButton) {
    logOutButton.addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });
  }

  function logoutUser() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedUser");
    window.location.href = "index.html";
  }
}
