# Pull Request Team Member

The following scripts work together to automate the process of adding users to a team when they send a pull request.

## Scenario

Take the following scenario as an example:

You have a project on GitHub and you want people to be able to help maintain the issue queue by adding labels and assignments, maybe even milestones. Your main code repository is something that you want to restict access and not give just anyone push access to push code changes. However, in order to control the issue's, one must have push access to the repository. So you create another repository solely for the issues. Now you're left with the task of manually adding people to the team if they want to contribute by helping maintain the issue queue. These scripts will detect if someone sends a pull request to the repository of your choise and then adds them to the team of your choice. If that team has pull access to your issues repository, then they can now have additional access to help maintain the issues.

## Installation

1. Checkout this repository on a server where you want to detect pull requests.
1. Run `npm install github` to get the require node-github library.

### Create the Service Hook
1. Edit createHook.js and fill out the following vars:
 * `user` and `pass` of a user who has access to the repository which you'd like to receive pull requests (suggest creating a user specifically for this script so you're not inputting your own creds on the server
 * `org` is the name of the organization which houses your repos
 * `serverAddress` is the server you'd like to recieve the pull request notices
1. Run `node createHook.js`. 
 * If there are no errors then check your repository's Service Hooks (https://github.com/[org]/[repo]/settings/hooks) and check to make sure you now have a WebHook URL with the specified server address.

### Monitor for Pull Requests
1. Edit app.js and fill out the following vars:
 * `user` and `pass` of a user who has administrative access to the repository to which has the team you'd like to add people (suggest using the user you used in the createHook process)
 * `teamid` of the team to which you'd like to add people
1. Run `node app.js` or use `supervisor` or however you like to run node apps on your server.