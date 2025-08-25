import "../style.css";
import { initTabs } from "./tab.js";
import { initRegister } from "./register.js";
import { initLogin } from "./authIn.js";
import { initLogout } from "./logOut.js";

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initRegister();
  initLogin();
  initLogout();
});
