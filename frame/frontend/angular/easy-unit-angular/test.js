// 获取本地IP地址
const os = require('os');

function getIPAddress() {
  const ips = [];
  const interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var interface = interfaces[devName];
    for (var i = 0; i < interface.length; i++) {
      var alias = interface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal && alias.cidr) {
        console.log(devName, alias)
        ips.push(alias.address);
      }
    }
  }
  return ips;
}

const ip = getIPAddress();
console.log(ip)
