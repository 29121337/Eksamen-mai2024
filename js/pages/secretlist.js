import {
  checkLoginStatus,
  logInUser,
  createUser,
  saveSessionData,
  getSessionData,
  clearSessionData,
  getAllSecretlists,
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
  let loggedInUser = await getSessionData()._uuid;
  let rightList = allSecretLists.find((list) => {
    return list.user_uuid == loggedInUser;
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
  let features = "";
  burgerList.forEach((burger) => {
    features += `
          <li>
          <div class="row container d-flex">
            <div class="col"><p>${burger.name}</p></div>
            <div class="col">
              <i class="bi bi-trash delete-button" data-burger-id="${burger.id}" id="${burger.id}"></i>
            </div>
          </div>
        </li>`;
  });
  secretListContainer.innerHTML = features;
  let deleteListItemBtn = document.getElementById(burger.id);
  deleteListItemBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let burgerId = event.target.dataset.burgerId;
    deleteListItem(burgerId);
  });
}

export async function addToSecretList(newFavorite) {
  let loggedInUser = await getSessionData()._uuid;
  let url = `${baseHref}secretlist`;
  let allSecretLists = await getAllSecretlists();
  let existingSecretList = allSecretLists.find(
    (list) => list.user_uuid === loggedInUser
  );
  if (existingSecretList) {
    existingSecretList.secretlist_ids.push(newFavorite);

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
async function deleteListItem(burgerId) {
  let loggedInUser = await getSessionData()._uuid;
  let url = `${baseHref}secretlist`;
  let allSecretLists = await getAllSecretlists();
  let existingSecretList = allSecretLists.find(
    (list) => list.user_uuid === loggedInUser
  );
  if (existingSecretList) {
    existingSecretList.secretlist_ids.delete(burgerId);
    console.log(existingSecretList);
  }
}
