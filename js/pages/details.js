import { addToSecretList, getSessionData } from "../backend.js";
import { getBurger, getBurgerMainImageSrc } from "../burger-api.js";

let loggedInUser = getSessionData();

let burgerDetailsContainer = document.querySelector("#burgerDetailsContainer");

let urlParams = new URLSearchParams(window.location.search);
let burgerId = urlParams.get("burgerId");
let burger = await getBurger(burgerId);
generateHTMLList(burger);

function generateHTMLList(burger) {
	let features = `
            <div class="feature col">
                <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                <img src="${getBurgerMainImageSrc(
									burger
								)}" alt="juicy bilde av ${burger.name} ">
                </div>
                <h3 class="fs-2 text-body-emphasis">${burger.name}</h3>
                <p>${burger.price}$</p>
                <p>
                ${burger.desc}
				</p>
                <div id="${burger.id}">
                <a href="#" id="addFavorite">
                    Legg til i favoritter
                </a>
                </div>
            </div>`;
	burgerDetailsContainer.innerHTML = features;
	let addFavoriteBtn = document.getElementById("addFavorite");
	addFavoriteBtn.addEventListener("click", function (event) {
		event.preventDefault();
		if (loggedInUser == null) {
			location.href = "/login.html?redirect=" + window.location.pathname + window.location.search;
			return;
		}
		addToSecretList(burger.id);
	});
}
