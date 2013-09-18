var GitHubApi = require("github")
  , github = new GitHubApi({version: "3.0.0"})
  , user = ""
  , pass = ""
  , org = "" // i.e. backdrop
  , repo = ""; // i.e. backdrop (since we want to register the hook to detect PRs from there)

// Auth
github.authenticate({
  type: "basic",
  username: user,
  password: pass
}, function(err, res) {
  if (res) {
    console.log('res', JSON.stringify(res));
  }
  if (err) {
    console.log('err', JSON.stringify(err));
  }
});

// createHook
github.repos.createHook({
  user: org,
  repo: repo,
  name: "web",
  config: {
    'url': 'http://23.92.20.128:3420', // this is the integration server url and port used in app.js
    'content_type': 'json' // this makes so we don't have to parse the 'payload' param and just get straight up json
  },
  events: ['pull_request'],
  active: true
}, function(err, res) {
  if (res) {
    console.log('res', JSON.stringify(res));
  }
  if (err) {
    console.log('err', JSON.stringify(err));
  }  
});