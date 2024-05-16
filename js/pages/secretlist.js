import { checkLoginStatus, logInUser, registerUser } from "../backend.js";
checkLoginStatus();
let registerForm = document.getElementById("registerForm");
let loginForm = document.getElementById("loginForm");

window.logUser = async function (event) {
  event.preventDefault();
  let username = event.target.querySelector(
    'input[placeholder="brukernavn"]'
  ).value;
  let password = event.target.querySelector(
    'input[placeholder="passord"]'
  ).value;
  let user = await logInUser(username, password);
  checkLoginStatus(user);
};

window.regUser = function (event) {
  event.preventDefault();
  let username = event.target.querySelector(
    'input[placeholder="brukernavn"]'
  ).value;
  let password = event.target.querySelector(
    'input[placeholder="passord"]'
  ).value;
  registerUser(username, password);
};

window.showLoginForm = function () {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
};
window.showRegisterForm = function () {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
};
