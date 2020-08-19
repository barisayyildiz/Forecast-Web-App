const express = require("express");
const fetch = require("node-fetch");
require('dotenv').config();
const app = express();
app.listen(3000, () => console.log("listening at 3000..."));


app.use(express.static('public'));
app.use(express.json({limit : '3mb'}));

app.post("/call", async (req, res) => {

	let cityName = req.body.city;

	let data = {};

	console.log(req.body);

	
	//forecast
	let keyForecast = process.env.keyForecast;
	let urlForecast = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${keyForecast}`;

	let response = await fetch(urlForecast);
	let json = await response.json();

	console.log(json);

	if(json.cod == 200)
	{
		data.name = json.name;
		data.celcius = (json.main.temp - 273).toFixed(1);
		data.countryId = json.sys.country;
		data.iconId = json.weather[0].id;
		data.info = json.weather[0].description;
	}

	data.cod = json.cod;


	//background color
	let keyImage = process.env.keyImage;
	let urlImage = `https://api.unsplash.com/search/photos/?client_id=${keyImage}&page=1&per_page=1&query=${cityName}`; 

	response = await fetch(urlImage);
	json = await response.json();

	data.url = json.results[0].urls.full

	res.json(data);


})
