// Server to receive POST data.
var http = require('http');
 
http.createServer(function (req, res) {
  // set up some routes
  switch(req.url) {
    case '/listener':
      console.log(req.content);
      break;
  };
}).listen(8200); // listen on tcp port 8080 (all interfaces)


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
