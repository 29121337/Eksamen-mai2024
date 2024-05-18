let crudToken = "Bearer 5sbTeBHD2DNZbeAOwXLeY3aBlXLSC68vnZr5m4asGnq7PxWBNA";
let baseHref = "https://crudapi.co.uk/api/v1";

export async function createUser(username, password) {
	let url = `${baseHref}/users`;
	let options = {
		method: "POST",
		headers: {
			Authorization: crudToken,
			"Content-Type": "application/json",
		},
		body: JSON.stringify([
			{
				username: username,
				password: password,
			},
		]),
	};

	try {
		let response = await fetch(url, options);
		return response.json();
	} catch (error) {
		alert(error);
	}
}

async function getAllUsers() {
	let url = `${baseHref}/users`;
	let options = {
		method: "GET",
		headers: {
			Authorization: crudToken,
			"Content-Type": "application/json",
		},
	};

	try {
		let response = await fetch(url, options);
		let data = await response.json();
		return data.items;
	} catch (error) {
		alert(error);
	}
}

export async function logInUser(username, password) {
	let allUsers = await getAllUsers();
	let rightUser = allUsers.find((user) => {
		return user.username == username && user.password == password;
	});
	if (rightUser != null) {
		saveSessionData(rightUser);
		let urlParams = new URLSearchParams(window.location.search);
		let redirect = urlParams.get("redirect");
		if (redirect) {
			location.href = redirect;
		} else {
			location.href = "/";
		}
	}
	return rightUser || null;
}

window.deleteUser = async function (event) {
	event.preventDefault();
	try {
		let loggedInUser = getSessionData();
		let url = `${baseHref}/users/${loggedInUser._uuid}`;
		let options = {
			method: "DELETE",
			headers: {
				Authorization: crudToken,
				"Content-Type": "application/json",
			},
		};
		await fetch(url, options);
		await deleteSecretList();
		clearSessionData();
	} catch (error) {
		console.log(error);
		alert(error);
	}
};

window.logOutUser = function () {
	clearSessionData();
};

async function deleteSecretList() {
	try {
		let loggedInUser = getSessionData();
		let allSecretLists = await getAllSecretlists();
		let existingSecretList = allSecretLists.find(
			(list) => list.user_uuid === loggedInUser._uuid
		);
		if (existingSecretList == null) {
			return;
		}
		let url = `${baseHref}/secretlist/${existingSecretList._uuid}`;
		let options = {
			method: "DELETE",
			headers: {
				Authorization: crudToken,
				"Content-Type": "application/json",
			},
		};

		let response = await fetch(url, options);
		return await response.json();
	} catch (error) {
		alert(error);
	}
}

export function clearSessionData() {
	localStorage.removeItem("userSession");
	location.reload();
}
export function saveSessionData(user) {
	localStorage.setItem("userSession", JSON.stringify(user));
}
export function getSessionData() {
	const userSession = localStorage.getItem("userSession");
	return userSession ? JSON.parse(userSession) : null;
}

export async function getAllSecretlists() {
	let url = `${baseHref}/secretlist`;
	let options = {
		method: "GET",
		headers: {
			Authorization: crudToken,
			"Content-Type": "application/json",
		},
	};

	try {
		let response = await fetch(url, options);
		let data = await response.json();
		return data.items;
	} catch (error) {
		alert(error);
	}
}
export async function addToSecretList(newFavorite) {
	let loggedInUser = getSessionData()._uuid;
	if (loggedInUser !== undefined) {
		let url = `${baseHref}/secretlist`;
		let allSecretLists = await getAllSecretlists();
		let existingSecretList = allSecretLists.find(
			(list) => list.user_uuid === loggedInUser
		);

		if (existingSecretList != null) {
			if (!existingSecretList.secretlist_ids.includes(newFavorite)) {
				existingSecretList.secretlist_ids.push(newFavorite);
			}
			updateSecretList(existingSecretList);
			document.getElementById(newFavorite).innerHTML = `<p> Lagt til😋 </p> `;
		} else {
			let favorites = {
				method: "POST",
				headers: {
					Authorization: crudToken,
					"Content-Type": "application/json",
				},
				body: JSON.stringify([
					{
						user_uuid: loggedInUser,
						secretlist_ids: [newFavorite],
					},
				]),
			};

			try {
				let response = await fetch(url, favorites);
				return response.json();
			} catch (error) {
				alert(error);
			}
		}
	} else {
		alert(
			"Du må logge deg på for å kunne legge til favoritter. Sjekk hjertet øverst til høyre. 😋"
		);
	}
}

export async function deleteListItem(burgerId) {
	let loggedInUser = getSessionData()._uuid;
	let allSecretLists = await getAllSecretlists();
	let existingSecretList = allSecretLists.find(
		(list) => list.user_uuid === loggedInUser
	);

	existingSecretList.secretlist_ids = existingSecretList.secretlist_ids.filter(
		(e) => e != burgerId
	);
	await updateSecretList(existingSecretList);
}

async function updateSecretList(updatedList) {
	let url = `${baseHref}/secretlist`;
	let favorites = {
		method: "PUT",
		headers: {
			Authorization: crudToken,
			"Content-Type": "application/json",
		},
		body: JSON.stringify([updatedList]),
	};

	try {
		let response = await fetch(url, favorites);
		return response.json();
	} catch (error) {
		alert(error);
	}
}
