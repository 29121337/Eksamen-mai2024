
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

  return rightUser || null;
}


window.deleteUser = async function () {
    let loggedInUser = getSessionData()._uuid;
  let url = `${baseHref}users/${loggedInUser}`;
  let user = {
    method: "DELETE",
    headers: {
      Authorization: crudToken,
      "Content-Type": "application/json",
    },
  };

  try {
    let response = await fetch(url, user);
    return response.json();
  } catch (error) {
    alert(error);
  };

  deleteSecretList(loggedInUser);
  clearSessionData();
  checkLoginStatus(null);
}

async function deleteSecretList(loggedInUser) {
    let url = `${baseHref}secretlist/?user_uuid=${loggedInUser}`;
    let list = {
      method: "DELETE",
      headers: {
        Authorization: crudToken,
        "Content-Type": "application/json",
      },
    };
  
    try {
      let response = await fetch(url, list);
      return response.json();
    } catch (error) {
      alert(error);
    };
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
export async function addToSecretList(newFavorite) {
    let loggedInUser =  getSessionData()._uuid;
    if (loggedInUser !== undefined) {
    let url = `${baseHref}secretlist`;
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
    }} else {
        alert("Du må logge deg på for å kunne legge til favoritter. Sjekk hjertet øverst til høyre. 😋")
    }
  }
  
 
export async function deleteListItem(burgerId) {
    let loggedInUser =  getSessionData()._uuid;
    let allSecretLists = await getAllSecretlists();
    let existingSecretList = allSecretLists.find(
      (list) => list.user_uuid === loggedInUser
    );

       existingSecretList.secretlist_ids = existingSecretList.secretlist_ids.filter(e => e != burgerId);
       console.log(existingSecretList);
       await updateSecretList (existingSecretList);
       getSecretList(loggedInUser);
      
}

  async function updateSecretList(updatedList) {
    let url = `${baseHref}secretlist`;
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
  