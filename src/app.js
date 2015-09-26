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

var tickerVal = 0;

io.on('connection', function (socket) {
    console.log('new connection');

    socket.join('room1');
    
    socket.on('tick', function (data) {
        console.log(data);
        tickerVal += data.amt;
        io.sockets.in('room1').emit('update', {amt: tickerVal});
    });
    
    socket.on('disconnect', function(data) {
        socket.leave('room1');
    });
});