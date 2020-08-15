let cityName = "Istanbul";

let urlForecast = "http://api.openweathermap.org/data/2.5/weather", keyForecast = "&APPID=e9b96acc72c0c1b9df8d81936190b1e3";
urlForecast += "?q=" + cityName + keyForecast;

//background image
let urlImage = "https://api.unsplash.com/search/photos/?client_id=c2BDCKJ6tVIDatSz2zPZT90e3rJpU_wytclJbGZ4zMo&page=1&per_page=1&query=";

urlImage += cityName;


fetch(urlForecast)
.then(response => response.json())
.then(data => {

	if(data.cod == 200)
	{
		console.log(data);



	}else if(data.cod == 404)
	{
		//hata kodu
		console.log(data.message);
	}

})
