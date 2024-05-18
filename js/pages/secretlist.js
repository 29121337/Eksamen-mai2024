import {
	getSessionData,
	getAllSecretlists,
	deleteListItem,
} from "../backend.js";
import { getAllBurgers } from "../burger-api.js";

let loggedInUser = getSessionData();
if (loggedInUser == null) {
	location.href = "login.html?redirect=secretlist.html";
} else {
	getSecretList();
}

async function getSecretList() {
	let allSecretLists = await getAllSecretlists();
	let rightList = allSecretLists.find((list) => {
		return list.user_uuid == loggedInUser._uuid;
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
		deleteIcon.addEventListener("click", async function (event) {
			event.preventDefault();
			await deleteListItem(burger.id);
			getSecretList();
		});

		deleteCol.appendChild(deleteIcon);

		rowDiv.appendChild(nameCol);
		rowDiv.appendChild(deleteCol);

		listItem.appendChild(rowDiv);

		secretListContainer.appendChild(listItem);
	});
}
