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

			//datas we will use
			let celcius = (data.main.temp - 273).toFixed(1);
			let countryId = data.sys.country;
			let iconId = data.weather[0].id;
			let description = data.weather[0].description;

			let mes = document.querySelector("p");
			mes.innerText = celcius + countryId + iconId + description;



		}else if(data.message == "Nothing to geocode")
		{
			//do nothing

		}else if(data.cod == 404)
		{
			//error message		city not found
			let mes = document.querySelector("p");
			mes.innerText = data.message;
			console.log(data);
		}
	})

}


function getInput()
{
	const button = document.querySelector("button");
	const input = document.querySelector("input");

	button.addEventListener("click", processInput(input.value));

	input.addEventListener("keyup", (event) => {
		//pressed enter
		if(event.keyCode == 13)
		{
			return processInput(input.value);
		}
	})

}

getInput();
