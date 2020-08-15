function onClick(button, input)
{	
	//background image
	let urlImage = "https://api.unsplash.com/search/photos/?client_id=c2BDCKJ6tVIDatSz2zPZT90e3rJpU_wytclJbGZ4zMo&page=1&per_page=1&query=";
	let cityName = input.value;	//user input
	urlImage += cityName;

	//foreacast
	let urlForecast = "http://api.openweathermap.org/data/2.5/weather", keyForecast = "&APPID=e9b96acc72c0c1b9df8d81936190b1e3";
	urlForecast += "?q=" + cityName + keyForecast;

	
	//output
	let output = "";
	const desc = document.getElementById("description");
	

	//fetch weather
	fetch(urlForecast)
	.then(response => response.json())
	.then(data => {

		output += "This is " + data.name + "<br>" + "Current temperature is " + String((data.main.temp - 273).toFixed(2)) + " celcius";
		desc.innerHTML = output;

	})
	.catch(err => console.log(err));

	//fetch image
	fetch(urlImage)
	.then(response => response.json())
	.then(data => {
		document.body.style.cssText = "background:url("+ data.results[0].urls.full + ") no-repeat center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
		console.log(data.results[0].urls.full);

	})
	.catch(err => console.log(err));

	
}



function main()
{
	let urlImage, urlForecast;

	const button = document.getElementById("btn");
	const input = document.getElementById("input");

	//Mouse and keyboard events...

	button.addEventListener("click", () => onClick(button, input));

	input.addEventListener("keyup", (event) => {
		if(event.keyCode == 13)
		{
			return onClick(button, input);
		}
	})

}

main();
