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
server.listen(8001,function(){ 
    console.log('Listening on '+server.address().port);
});