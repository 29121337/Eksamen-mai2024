
import {getSecretList, generateSecretList} from "./pages/secretlist.js"

let crudToken = "Bearer 5sbTeBHD2DNZbeAOwXLeY3aBlXLSC68vnZr5m4asGnq7PxWBNA";
let baseHref = "https://crudapi.co.uk/api/v1/";




export async function createUser(username, password) {
  let url = `${baseHref}users`;
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
  let url = `${baseHref}users`;
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
  console.log(rightUser);
  return rightUser || null;
}

async function deleteUser(userId) {
  let url = `${baseHref}users/${userId}`;
  let options = {
    method: "DELETE",
    headers: {
      Authorization: crudToken,
      "Content-Type": "application/json",
    },
  };

  try {
    let response = await fetch(url, options);
    return response.json();
  } catch (error) {
    alert(error);
  }
}

export async function checkLoginStatus(user) {
  let loginContainer = document.getElementById("loginContainer");
  let contentContainer = document.getElementById("secretContentContainer");
  let logOutButton = document.getElementById("logoutButton");
  let selfDestroyButton = document.getElementById("selfDestroyButton")

  if (user) {
    loginContainer.style.display = "none";
    contentContainer.style.display = "block";
    logOutButton.style.display = "block";
    selfDestroyButton.style.display = "block";
    document.getElementById(
      "userMessage"
    ).innerText = `Velkommen, ${user.username}! 🍔  `;
    getSecretList(user._uuid);
  } else {
    loginContainer.style.display = "block";
    contentContainer.style.display = "none";
  }
}

export function clearSessionData() {
  localStorage.removeItem("userSession");
}
export function saveSessionData(user) {
  localStorage.setItem("userSession", JSON.stringify(user));
}
export function getSessionData() {
  const userSession = localStorage.getItem("userSession");
  return userSession ? JSON.parse(userSession) : null;
}

export async function getAllSecretlists() {
  let url = `${baseHref}secretlist`;
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
