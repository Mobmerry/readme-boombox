var app     = require('express')();
var gitexec = require('gitexec');
var request = require('request');

var config  = require('./config');

app.post('/notify-slack', function (req, res) {
  // handle errors that will be in return Stream object
  gitexec.exec(config.repoPath, config.gitFetchCommand);
  gitexec.exec(config.repoPath, config.gitRebaseCommand);

  gitexec.execCollect(config.repoPath, config.gitDiffCommand, function (err, response) {
    if (err) {
      // handle this error and bail
    }

    if (response) {
      var requestData = {
        text: config.warningHeader + '```' + response + '```'
      }

      request({
        url: config.slackWebhookUrl,
        method: 'POST',
        json: requestData

      }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(body)
        } else {
          console.log("error: " + error)
          console.log("response.statusCode: " + response.statusCode)
          console.log("response.statusText: " + response.statusText)
        }

      });
    }
  });
});

app.listen(config.port, function () {
  console.log('Server listening on port %d', config.port);
});
