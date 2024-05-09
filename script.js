
// api-doc: https://rapidapi.com/kaushiksheel9/api/burgers-hub/

function fetchBurgers () {
var url = 'https://burgers-hub.p.rapidapi.com/burgers';
var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5b9171c328msh511bcd1058acb2ap183af7jsncf4ecbf63195',
		'X-RapidAPI-Host': 'burgers-hub.p.rapidapi.com'
	}
};

console.log(options);
/*
try {
	var response = await fetch(url, options);
	var result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
*/
};

/*
function generateHTML (result) {
    var list = document.querySelector("#listContainer")
    result.forEach (burger => {
        var feature = `<div class="feature col">
        <div class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3">
            <svg class="bi" width="1em" height="1em"><use xlink:href="#collection"></use></svg>
        </div>
        <h3 class="fs-2 text-body-emphasis">${title}</h3>
        <p>${desc}</p>
        <a href="#" class="icon-link">
            Add to favorites
            <svg class="bi"><use xlink:href="#chevron-right"></use></svg>
        </a>
    </div>`
list.innerHTML = feature }
    )
}