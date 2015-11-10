/**
 * server.js
 *
 * @description: Server script for www.chrisyou.ng
 * @author: Chris Young (mail@chrisyou.ng)
 * @created: September 17th, 2015
 * @updated: October 29th, 2015
 */

var fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    uuid = require('node-uuid');

var app = express(),
    port = isNaN(process.argv[2]) ? 80 : process.argv[2];

var highScore = require(__dirname + '/high_score.json');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.disable('x-powered-by');

/**
 * @description: Assigns all requests a unique id for logging
 */
app.use(function (request, response, next) {
  request.id = uuid.v4();
  console.log('[' + request.id + '] request to ' + request.method + ' ' + request.url + ' from ' + request.connection.remoteAddress + ' at ' + new Date());
  next();
});

/**
 * GET /
 * @description: Redirects / to /portfolio/index.html
 */
app.get('/', function (request, response) {
  console.log('[' + request.id + '] redirected / to portfolio/');
  response.redirect('portfolio/');
});

/**
 * GET /score
 * @description: Responds with the current Pirate's Booty high score
 */
app.get('/score', function (request, response) {
  console.log('[' + request.id + '] responded with Pirate\'s Booy high score');
  response.json(highScore.score);
});

/**
 * POST /score
 * @description: Submits a Pirate's Booty player's score and updates the high score if a new record has been set
 */
app.post('/score', function (request, response) {
  console.log('[' + request.id + '] received a Pirate\'s Booty score');

  if (isNaN(request.body.score) || request.body.score < 1) {
    console.log('[' + request.id + '] received an invalid Pirate\'s Booty score (' + request.body.score + ')');
    return response.sendStatus(400);
  }

  if (request.body.score <= highScore.score) {
    console.log('[' + request.id + '] Pirate\'s Booty score was not a new high score');
    return response.sendStatus(204);
  }

  var newHighScore = JSON.stringify({ score: request.body.score });
  highScore.score = request.body.score;

  fs.writeFile(__dirname + '/high_score.json', newHighScore, function (error) {
    if (error) {
      console.log('[' + request.id + '] failed to set a new Pirate\'s Booty high score');
      return response.sendStatus(500);
    }

    response.sendStatus(201);
    console.log('[' + request.id + '] set a new Pirate\'s Booty high score');
  });
});

var server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});

