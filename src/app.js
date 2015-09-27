var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || process.env.NODE_PORT || 5000;
var path = require('path');

server.listen(port);
console.log('Listening on port: ' + port);

app.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

app.get('/notCody.gif', function(req,res){
    res.sendFile(path.resolve(__dirname + '/../public/notCody.gif'));
});

var tickerVal = 0;

io.on('connection', function (socket) {
    console.log('new connection');

    socket.join('room1');
    
    socket.on('objectUpdate', function (data) {
        io.sockets.in('room1').emit('update', data);
    });
    
    socket.on('disconnect', function(data) {
        socket.leave('room1');
    });
});