let crudToken = "Bearer 5sbTeBHD2DNZbeAOwXLeY3aBlXLSC68vnZr5m4asGnq7PxWBNA";
let baseHref = "https://crudapi.co.uk/api/v1/";

export async function registerUser(username, password) {
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

  if (user) {
    loginContainer.style.display = "none";
    contentContainer.style.display = "block";
    document.getElementById(
      "userGreeting"
    ).innerText = `Welcome, ${user.username}!`;
  } else {
    loginContainer.style.display = "block";
    contentContainer.style.display = "none";
  }
}
