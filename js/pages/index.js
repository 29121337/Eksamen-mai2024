import { getAllBurgers, getBurgerMainImageSrc } from "../burger-api.js";
const burgersListContainer = document.querySelector("#burgersListContainer");

let burgers = await getAllBurgers();
generateHTMLList(burgers);

function generateHTMLList(burgers) {
	let features = "";
	burgers.forEach((burger) => {
		features += `
            <div class="feature col">
                <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
                <img src="${getBurgerMainImageSrc(
									burger
								)}" alt="juicy bilde av ${burger.name} ">
                </div>
                <h3 class="fs-2 text-body-emphasis">${burger.name}</h3>
                <p>${burger.price}$</p>
                <a href="/details.html?burgerId=${burger.id}">
                    Se detaljer
                </a>
            </div>`;
	});
	burgersListContainer.innerHTML = features;
}
