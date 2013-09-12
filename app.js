var http = require('http');
var Querystring = require('querystring');

http.createServer(function (req, res) {
  var buffer = [];
  var bufferLength = 0;
  var failed = false;

  req.on('data', function (chunk) {
    if (failed) return;
    buffer.push(chunk);
    bufferLength += chunk.length;
  });

  req.on('end', function(chunk) {
    if (failed) return;
    var data;

    if (chunk) {
      buffer.push(chunk);
      bufferLength += chunk.length;
    }

    data = Buffer.concat(buffer, bufferLength).toString();
    data = Querystring.parse(data).payload;
    data = parse(data);
    console.log(data);
  });
}).listen(3420);

function parse(data) {
  var result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    result = false;
  }
  return result;
}
// var GitHubApi = require("github")
//   , github = new GitHubApi({version: "3.0.0"})
//   , auth_user = ''
//   , auth_pass = ''
//   , user = ''
//   , repo = '';

// github.authenticate({
//     username: auth_user,
//     password: auth_pass,
//     type: "basic"
// });
