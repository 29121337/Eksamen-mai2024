import { getSessionData, logInUser, createUser } from "../backend.js";

let loggedInUser = getSessionData();
if (loggedInUser != null) {
	location.href = "/";
}

let registerForm = document.querySelector("#registerForm");
registerForm.addEventListener("submit", registerUser);

async function registerUser(event) {
	event.preventDefault();
	let username = document.querySelector("#username").value;
	let password = document.querySelector("#password").value;
	let registeredUser = await createUser(username, password);
	if (registeredUser) {
		logInUser(username, password);
	}
}
