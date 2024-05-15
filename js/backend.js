let crudToken = "Bearer 5sbTeBHD2DNZbeAOwXLeY3aBlXLSC68vnZr5m4asGnq7PxWBNA";
let baseHref = "https://crudapi.co.uk/api/v1/";
async function registerUser(username, password) {
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
    return response.json();
  } catch (error) {
    alert(error);
  }
}
async function logInUser(username, password) {
  let allUsers = await getAllUsers();
  let rightUser = allUsers.find((user) => {
    return user.username == username && user.password == password;
  });
  return rightUser;
}

// async function deleteUSer();
