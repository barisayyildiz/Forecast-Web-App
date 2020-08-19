/*
let test = () => console.log("yeyyy...");


document.querySelector('button').addEventListener("click", event => test());
*/



function sendData(city)
{
	console.log("only on click event...");

	let data = {};
	data.city = city;

	fetch("/asd", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			'Content-Type' : "application/json"
		}
	})
	.then(response => response.json())
	.then(response => console.log(response));

}


//onclick and 'enter' events...
document.querySelector('button').addEventListener("click", event => sendData());

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


