const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.listen(3000, () => console.log("listening at 3000..."));


app.use(express.static('public'));
app.use(express.json({limit : '3mb'}));

app.post("/call", async (req, res) => {

	let cityName = req.body.city;

	console.log(req.body);

	let urlImage = "https://api.unsplash.com/search/photos/?client_id=", keyImage = "c2BDCKJ6tVIDatSz2zPZT90e3rJpU_wytclJbGZ4zMo";
	urlImage += keyImage + "&page=1&per_page=1&query=" + cityName;

	let response = await fetch(urlImage);
	let data = await response.json();

	res.json(data);


})
