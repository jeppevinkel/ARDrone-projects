var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

client.config('video:video_channel', 3);

var pngStream = client.getPngStream();
var lastPng;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	pngStream.on('data', function(pngBuffer) {
		socket.emit('newFrame2', "data:image/png;base64,"+ pngBuffer.toString("base64"));
	});
});

http.listen(8080, function() {
	console.log('Listening on *:8080');
})