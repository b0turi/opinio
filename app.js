let http = require('http');
let express = require('express');
let app = express();
let request = require('request');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/token', function(req, res) {
	res.send({token: accessToken});
	
});
app.use(express.static('public'));
const hostname = '172.31.80.176';
const port = 3000;

const server = http.createServer(app);
server.listen(port, hostname);

var accessToken = '';

const spotifyClientData = 'ZmVkOTFkMmNhNTU1NDY5MzlkZGIzZGZhNDhlZDEzNmE6MjJlY2Q5YmNmMzliNDA5ODkyMTdiNWM5ZDRkYmY1Y2I=';

let authOptions = {
	url: 'https://accounts.spotify.com/api/token',
	headers: {
		'Authorization': 'Basic ' + spotifyClientData
	},
	form: {
		grant_type: 'client_credentials'
	},
	json: true
};

function getAccessToken() {
	request.post(authOptions, function(error, response, body) {
		if(!error && response.statusCode === 200) {
			accessToken =  body.access_token;
		}
	});
}

getAccessToken();
setInterval(getAccessToken, 1000 * 3600);
