let http = require('http');
let express = require('express');
let app = express();
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.use(express.static('public'));
const hostname = '172.31.80.176';
const port = 3000;

const server = http.createServer(app);
server.listen(port, hostname);
