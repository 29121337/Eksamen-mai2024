import { getAllBurgers } from "./burger-api.js";

let crudToken = "Bearer 5sbTeBHD2DNZbeAOwXLeY3aBlXLSC68vnZr5m4asGnq7PxWBNA";
let baseHref = "https://crudapi.co.uk/api/v1/";


async function generateSecretList(rightList) {
  let allBurgers = await getAllBurgers();
  let burgerList = allBurgers.filter(burger => rightList.includes(burger.id));
  console.log(burgerList);
generateHTMLSecretList(burgerList);
}

function generateHTMLSecretList(burgerList) {
    let secretListContainer = document.querySelector("#secretList");
      let features = "";
      burgerList.forEach((burger) => {
          features += `
          <li>
          <div class="row container d-flex">
            <div class="col"><p>${burger.name}</p></div>
            <div class="col">
              <i class="bi bi-trash" id="deleteButton"></i>
            </div>
          </div>
        </li>`;
      });
      secretListContainer.innerHTML = features;
  };
  
async function getSecretList(userId) {
  let allSecretLists = await getAllSecretlists();
  let loggedInUser = await getSessionData()._uuid;
  let rightList = allSecretLists.find((list) => {
    return list.user_uuid == loggedInUser;
  });
  
  
  if (rightList !== undefined) {
    rightList = rightList.secretlist;
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

  if (user) {
    loginContainer.style.display = "none";
    contentContainer.style.display = "block";
    logOutButton.style.display = "block";
    document.getElementById(
      "userMessage"
    ).innerText = `Welcome, ${user.username}! 🍔  `;
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

export async function addToSecretList(newFavorite) {
    console.log(newFavorite);
    let loggedInUser = await getSessionData()._uuid;
    let url = `${baseHref}secretlist`;
    let allSecretLists = await getAllSecretlists();
    let existingSecretList = allSecretLists.find(list => list.user_uuid === loggedInUser);
    if (existingSecretList) {
    existingSecretList.secretlist_ids.push(newFavorite);
    console.log(existingSecretList);
    let favorites = {
        method: "PUT",
        headers: {
          Authorization: crudToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(existingSecretList), 
    };

    try {
        let response = await fetch(url, favorites);
        return response.json();
    } catch (error) {
        alert(error);
    } }
    else {
    let favorites = {
        method: "POST",
        headers: {
          Authorization: crudToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
            {
              "user_uuid": loggedInUser,
              "secretlist_ids": [ newFavorite
              ]
            }
          ]),
      };

    
      try {
        let response = await fetch(url, favorites);
        return response.json();
      } catch (error) {
        alert(error);
      }
}};
