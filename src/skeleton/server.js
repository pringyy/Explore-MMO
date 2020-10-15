/*This code is used to support the server backend with Phaser*/
/*I used this tutorial to learn how to do this with Phasher: https://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js*/


/*Express is a module used to serve files to clients*/
/*This code creates an express instance and uses the http module so allow it to be deployed to a server*/
/*Socket IO is a module that listens for connections to this server*/
var express = require('express');
var application = express();
var server = require('http').Server(application);
var io = require('socket.io').listen(server);



/*This code allows the server to be able to interact with static files*/
application.use('/css',express.static(__dirname + '/css'));
application.use('/js',express.static(__dirname + '/js'));
application.use('/assets',express.static(__dirname + '/assets'));

application.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});


/*Sets what port the server listens to, which in this case is 8001*/
server.listen(8081,function(){ 
    console.log('Listening on '+server.address().port);
});
server.lastPlayderID = 0; // Keep track of the last id assigned to a new player

io.on('connection',function(socket){

    socket.on('newplayer',function(){
        socket.player = {
            id: server.lastPlayderID++,
            x: 100,
            y: 100
        };
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

        /*Moves player to where they click on the screen*/
        socket.on('click',function(data){
            console.log('click to '+data.x+', '+data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move',socket.player);
        });

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });
});


function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}


