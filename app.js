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
    
    console.log(data.sender);
    // this should print to the console something like:
    // { login: 'sirkitree',
    //   id: 28543,
    //   avatar_url: 'https://0.gravatar.com/avatar/4950478a2c8a6627004a41b2617948a4?d=https%3A%2F%2Fidenticons.github.com%2F11b53f23ad385f735495083c7327faf9.png',
    //   gravatar_id: '4950478a2c8a6627004a41b2617948a4',
    //   url: 'https://api.github.com/users/sirkitree',
    //   html_url: 'https://github.com/sirkitree',
    //   followers_url: 'https://api.github.com/users/sirkitree/followers',
    //   following_url: 'https://api.github.com/users/sirkitree/following{/other_user}',
    //   gists_url: 'https://api.github.com/users/sirkitree/gists{/gist_id}',
    //   starred_url: 'https://api.github.com/users/sirkitree/starred{/owner}{/repo}',
    //   subscriptions_url: 'https://api.github.com/users/sirkitree/subscriptions',
    //   organizations_url: 'https://api.github.com/users/sirkitree/orgs',
    //   repos_url: 'https://api.github.com/users/sirkitree/repos',
    //   events_url: 'https://api.github.com/users/sirkitree/events{/privacy}',
    //   received_events_url: 'https://api.github.com/users/sirkitree/received_events',
    //   type: 'User' }    

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
    github.getTeamMember({
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
    github.addTeamMember({
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
