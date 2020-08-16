function processInput(cityName)
{

	//forecast
	let urlForecast = "http://api.openweathermap.org/data/2.5/weather", keyForecast = "&APPID=e9b96acc72c0c1b9df8d81936190b1e3";
	urlForecast += "?q=" + cityName + keyForecast;

	//background image
	let urlImage = "https://api.unsplash.com/search/photos/?client_id=", keyImage = "c2BDCKJ6tVIDatSz2zPZT90e3rJpU_wytclJbGZ4zMo";
	urlImage += keyImage + "&page=1&per_page=1&query=" + cityName;

	//fetch from OpenWeather API
	fetch(urlForecast)
	.then(response => response.json())
	.then(data => {

		console.log(data.cod);
		if(data.cod == 200)
		{
			console.log(data);

			/*
			//datas we will use
			let celcius = (data.main.temp - 273).toFixed(1);
			let countryId = data.sys.country;
			let iconId = data.weather[0].id;
			let description = data.weather[0].description;

			let mes = document.querySelector("p");
			mes.innerText = celcius + countryId + iconId + description;
			*/
			let desc = document.querySelector("#description");
			desc.style.visibility = "visible";
			//desc.innerHTML = "<p>asd</asd>";
			desc.innerHTML = "";

			let name = data.name;
			let celcius = (data.main.temp - 273).toFixed(1);
			let countryId = data.sys.country;
			let iconId = data.weather[0].id;
			let info = data.weather[0].description;

			//desc.innerHTML += "<p>" + name + " <span id = 'country'>" + countryId + " </span>" + "</p>";
			desc.innerHTML += "<p>" + name + " <img src = 'https://www.countryflags.io/" + countryId + "/flat/64.png'>" + "</p>";
			desc.innerHTML += "<p>" + "<span class = 'degree'> " + celcius + "</span>"  + " &deg;C" + "</p>";
			desc.innerHTML += "<p class = 'info'>" + info + "</p>";
			desc.innerHTML += "<i class='owf owf-4x owf-" + iconId + "'></li";





		}else if(data.message == "Nothing to geocode")
		{
			//do nothing

		}else if(data.cod == 404)
		{
			//error message		city not found
			let desc = document.querySelector("#description");
			desc.style.visibility = "visible";
			
			desc.innerHTML = "";
			desc.innerHTML += "<p>" + data.message + " </p>";
		}
	})

	//fetch from Unsplash API for background image
	fetch(urlImage)
	.then(response => response.json())
	.then(data => {
		document.body.style.cssText = "background:url("+ data.results[0].urls.full + ") no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
		console.log(data.results[0].urls.full);

	})
	.catch(err => console.log(err));



}


function getInput()
{
	const button = document.querySelector("button");
	const input = document.querySelector("input");

	button.addEventListener("click", () => {
		return processInput(input.value)
	});

	input.addEventListener("keyup", (event) => {
		//pressed enter
		if(event.keyCode == 13)
		{
			return processInput(input.value);
		}
	})

}

getInput();
