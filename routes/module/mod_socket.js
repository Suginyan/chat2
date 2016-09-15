var http = require('http');
//サーバインスタンス作成
var server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end('server connected');
});
var io = require('socket.io').listen(server);

server.listen(8888);//8888番ポートで起動

var userHash = {}; // ユーザ

//接続確立時の処理
io.sockets.on('connection', function (socket) {
  
  // 入室
  socket.on('entryMessage', function(d){
  	userHash[socket.id] = d.user;
  	io.emit('receiveEntryMessage', d);
  });
  // メッセージ
  socket.on('message', function(d){
  	io.emit('receiveMessage', d);
  });
  // 退室
  socket.on('exitMessage', function(d){
  	io.emit("receiveExitMessage", d);
  });
  
});