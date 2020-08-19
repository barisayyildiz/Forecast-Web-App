
function sendData(city)
{
	let data = {city: city};

	console.log(city);
	console.log(data);

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
	.then(data => console.log(data));

}



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


