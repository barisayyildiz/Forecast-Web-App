let express = require('express');
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

app.post("/", (request, response) => {

	console.log(request.body);

	response.json({
		city:request.body.city,
		status : "ok"
	});


})

