let express = require('express');
const fetch = require("node-fetch");

let app = express();
let portNumber = 3000;
app.listen(portNumber, () => console.log(`Listenin port number ${portNumber}...`));

app.use(express.static('public'));
app.use(express.json({limit : '3mb'}));

/*
app.all('/secret', (request, response) => {

	response.send("Secret router...");

})
*/

app.post("/asd", async (request, response) => {

	let dataToBeSent = {};

	//save the city name...
	let cityName = request.body.city;

	//forecast
	let keyForecast = "&APPID=e9b96acc72c0c1b9df8d81936190b1e3";
	let urlForecast = `http://api.openweathermap.org/data/2.5/weather/?q=${cityName}/&APPID=${keyForecast}`;

	//background image
	let keyImage = "c2BDCKJ6tVIDatSz2zPZT90e3rJpU_wytclJbGZ4zMo";
	let urlImage = `https://api.unsplash.com/search/photos/?client_id=${keyImage}&page=1&per_page=1&query=${cityName}`;

	//console.log(request.body);


	//fetch from OpenWeather API
	let response_fetch = await fetch(keyForecast);
	let data = await response_fetch.json();

	if(data.cod == 200)
	{
		dataToBeSent.cod = data.cod;
		dataToBeSent.name = data.name;
		dataToBeSent.celcius = (data.main.temp - 273).toFixed(1);
		dataToBeSent.iconId = data.weather[0].id;
		dataToBeSent.info = data.weather[0].description;

		let response_fetch = await fetch(urlImage);
		let data = await response_fetch.json();

		dataToBeSent.url = data.results[0].urls.full;


	}else if(data.message == "Nothing to geocode")
	{
		//do nothing...
		dataToBeSent.cod = 500;
	}else if(data.cod == 404)
	{
		dataToBeSent.cod = data.cod;
		dataToBeSent.message = data.message;
	}


	response.send(dataToBeSent);








	/*
	response.json({
		city:request.body.city,
		status : "ok"
	});
	*/


})

