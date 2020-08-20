
function useData(data)
{
	if(data.cod == 200)
	{
		let desc = document.querySelector("#description");
		desc.style.visibility = "visible";
		//desc.innerHTML = "<p>asd</asd>";
		desc.innerHTML = "";

		//desc.innerHTML += "<p>" + name + " <span id = 'country'>" + countryId + " </span>" + "</p>";
		desc.innerHTML += "<p>" + data.name + " <img src = 'https://www.countryflags.io/" + data.countryId + "/flat/64.png'>" + "</p>";
		desc.innerHTML += "<p>" + "<span class = 'degree'> " + data.celcius + "</span>"  + " &deg;C" + "</p>";
		desc.innerHTML += "<p class = 'info'>" + data.info + "</p>";
		desc.innerHTML += "<i class='owf owf-4x owf-" + data.iconId + "'></li";

		//document.body.style.cssText = "background:url("+ data.results[0].urls.full + ") no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
		document.body.style.cssText = `background:url(${data.url}) no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;`;

		return;
	}


	//error message	city not found
	let desc = document.querySelector("#description");
	desc.style.visibility = "visible";
	
	desc.innerHTML = "<p>City not found</p>";

}


function sendData(city)
{
	let data = {city: city};

	fetch("/call", {
		method: "POST",
		body: JSON.stringify(data),
		//this is very important !!!
		//else it will send an empty body !!!
		headers: {
			'Content-Type' : "application/json"
		}
	})
	.then(response => response.json())
	.then(data => useData(data));

}

//Get the events...

const button = document.querySelector("button");
const input = document.querySelector("input");

button.addEventListener("click", () => {
		return sendData(input.value);
});


input.addEventListener("keyup", (event) => {
	//pressed enter
	if(event.keyCode == 13)
	{
		return sendData(input.value);
	}
})


