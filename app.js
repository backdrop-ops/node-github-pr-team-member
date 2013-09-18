var http = require('http')
  , Querystring = require('querystring');

// create as server for listening to the webhook
http.createServer(function (req, res) {
  var buffer = []
    , bufferLength = 0
    , failed = false;

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
    data = parse(data);
    // user name will be in data.sender.login

    if (data.sender.login) {
      // instanciate the github api
      var GitHubApi = require("github")
        , github = new GitHubApi({version: "3.0.0"})
        , user = ""
        , pass = ""
        , teamid = ;

      // auth
      github.authenticate({
        type: "basic",
        username: user,
        password: pass
      }, function rlog(err, res) {
        if (res) {
          console.log('res', JSON.stringify(res));
        }
        if (err) {
          console.log('err', JSON.stringify(err));
        }
      });

      // check to see if the sender already is a team member
      github.orgs.getTeamMember({
        id: teamid,
        user: data.sender.login
      }, function rlog(err, res) {
        if (res) {
          console.log('res', JSON.stringify(res));
        }
        if (err) {
          console.log('err', JSON.stringify(err));
        }
      });

      // if they're not, add them so they can control labels
      github.orgs.addTeamMember({
        id: teamid,
        user: data.sender.login
      }, function rlog(err, res) {
        if (res) {
          console.log('res', JSON.stringify(res));
        }
        if (err) {
          console.log('err', JSON.stringify(err));
        }
      });
    }
    
  });
}).listen(3420);


/**
 * Helper functions
 */

// parse json a bit
function parse(data) {
  var result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    result = false;
  }
  return result;
}
