import { getSessionData, logInUser } from "../backend.js";

let loggedInUser = getSessionData();
if (loggedInUser != null) {
	location.href = "/";
}

let loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", logUser);

async function logUser(event) {
	try {
		event.preventDefault();
		let username = document.querySelector("#username").value;
		let password = document.querySelector("#password").value;
		let user = await logInUser(username, password);
		if (!user) {
			alert("feil brukernavn eller passord :/");
			return;
		}
	} catch (error) {
		alert(error);
	}
}
