import { checkLoginStatus, logInUser, createUser, saveSessionData, getSessionData, clearSessionData} from "../backend.js";


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
  try {
    let user = await logInUser(username, password);
    if (user) {
        saveSessionData(user); 
        checkLoginStatus(user);
      } else {
        alert("feil brukernavn eller passord :/");
      }
  } catch (error) {
    console.log(error);
  }
};

window.registerUser = function (event) {
  event.preventDefault();
  let username = event.target.querySelector(
    'input[placeholder="brukernavn"]'
  ).value;
  let password = event.target.querySelector(
    'input[placeholder="passord"]'
  ).value;

  console.log(username, password);
  createUser(username, password);
  checkLoginStatus(username, password);
};

window.showLoginForm = function () {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
};
window.showRegisterForm = function () {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
};
window.addEventListener('load', () => {
    let user = getSessionData();
    checkLoginStatus(user);
  });

window.logOutUser = function (){
    clearSessionData();
    checkLoginStatus(null);
}

