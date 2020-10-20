let io = require("socket.io")(http);
let utf8 = require("utf8");
let SSHClient = require("ssh2").Client;
let Koa = require("koa");
let http = require("http");
const app = new Koa();
//创建SSH服务
function createSSHServer(machineConfig, socket) {
  var ssh = new SSHClient();
  let { msgId, ip, username, password } = machineConfig;
  ssh
    .on("ready", function() {
      socket.emit(
        msgId,
        "\r\n***" + ip + " SSH CONNECTION ESTABLISHED ***\r\n"
      );
      ssh.shell(function(err, stream) {
        if (err) {
          return socket.emit(
            msgId,
            "\r\n*** SSH SHELL ERROR: " + err.message + " ***\r\n"
          );
        }
        socket.on(msgId, function(data) {
          stream.write(data);
        });
        stream
          .on("data", function(d) {
            socket.emit(msgId, utf8.decode(d.toString("binary")));
          })
          .on("close", function() {
            ssh.end();
          });
      });
    })
    .on("close", function() {
      socket.emit(msgId, "\r\n*** SSH CONNECTION CLOSED ***\r\n");
    })
    .on("error", function(err) {
      console.log(err);
      socket.emit(
        msgId,
        "\r\n*** SSH CONNECTION ERROR: " + err.message + " ***\r\n"
      );
    })
    .connect({
      host: ip,
      port: 22,
      username: username,
      password: password
    });
}

io.on("connection", function(socket) {
  socket.on("createSSHServer", function(machineConfig) {
    //新建一个ssh连接
    console.log("createSSHServer");
    createSSHServer(machineConfig, socket);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

http.createServer(app.callback()).listen(4002);
