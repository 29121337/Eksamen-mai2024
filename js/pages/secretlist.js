import {
  checkLoginStatus,
  logInUser,
  createUser,
  saveSessionData,
  getSessionData,
  clearSessionData,
  getAllSecretlists,
  deleteListItem
} from "../backend.js";
import { getAllBurgers } from "../burger-api.js";

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
window.addEventListener("load", () => {
  let user = getSessionData();
  checkLoginStatus(user);
});

window.logOutUser = function () {
  clearSessionData();
  checkLoginStatus(null);
};
export async function getSecretList(userId) {
  let allSecretLists = await getAllSecretlists();
  let rightList = allSecretLists.find((list) => {
    return list.user_uuid == userId;
  });

  if (rightList !== undefined) {
    rightList = rightList.secretlist_ids;
    generateSecretList(rightList);
  } else {
    document.getElementById(
      "userMessage"
    ).innerText = `Ser ut som du ikke har valgt noen favoritter enda 😋 `;
    document.getElementById(
      "headerSecretList"
    ).innerHTML = `<a href="/index.html" class="message"> Trykk her for å se vår burger lineup! </a> `;
  }
}

export async function generateSecretList(rightList) {
  let allBurgers = await getAllBurgers();
  let burgerList = allBurgers.filter((burger) => rightList.includes(burger.id));
  console.log(burgerList);
  generateHTMLSecretList(burgerList);
}

function generateHTMLSecretList(burgerList) {
	let secretListContainer = document.querySelector("#secretList");
  secretListContainer.innerHTML = "";
	burgerList.forEach((burger) => {
		let listItem = document.createElement("li");

		let rowDiv = document.createElement("div");
		rowDiv.className = "row container d-flex";

		let nameCol = document.createElement("div");
		nameCol.className = "col";
		let nameP = document.createElement("p");
		nameP.textContent = burger.name;
		nameCol.appendChild(nameP);

		let deleteCol = document.createElement("div");
		deleteCol.className = "col";
		let deleteIcon = document.createElement("i");
		deleteIcon.className = "bi bi-trash delete-button";
		deleteIcon.id = burger.id;
		deleteIcon.addEventListener("click", function (event) {
			event.preventDefault();
			deleteListItem(burger.id);
		});
    
		deleteCol.appendChild(deleteIcon);

		rowDiv.appendChild(nameCol);
		rowDiv.appendChild(deleteCol);

		listItem.appendChild(rowDiv);

		secretListContainer.appendChild(listItem);
	});
}



