// Author: Daniel Beyer
// CS290 Web Development
// 11-16-16

var express = require('express');
var apiKey = '754BFD966BEBE0588B710CD6A6A05E07';
var app = express();
var request = require('request');

app.set('port', 3000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Here gets parameters from end of URL to use in api address.  These parameters will come from submit buttons 
// on the respective sites
app.get('/getnews', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
	var url = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=' + qParams[0].name + '&count=3&maxlength=300&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.get('/getachievementsperc', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
	var url = 'http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=' + qParams[0].name + '&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

//Requires AppId and name of achievement
app.get('/getglobalstats', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
	var url = ' http://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/?format=json&appid=' + qParams[0].name + '&count=1&name[0]=' + qParams[0].value;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.get('/getplayersummary', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
var url = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + apiKey + '&steamids=' + qParams[0].name;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.get('/getfriendlist', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
var url = 'http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=' + apiKey + '&steamid=' + qParams[0].name + '&relationship=friend';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.get('/getplayerachievements', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
var url = 'http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=440&key=' + apiKey + '&steamid=' + qParams[0].name;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

//Requires AppId and playerID
app.get('/getuserstats', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
var url = 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=' + qParams[0].name + '&key=' + apiKey + '&steamid=' + qParams[0].value;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.get('/getownedgames', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
var url = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=' + apiKey + '&steamid=' + qParams[0].name + '&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.get('/getrecentlyplayed', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
var url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=' + apiKey + '&steamid=' + qParams[0].name + '&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.get('/isplayingshared', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
var url = 'http://api.steampowered.com/IPlayerService/IsPlayingSharedGame/v0001/?key=' + apiKey + '&steamid=' + qParams[0].name + '&appid_playing=' + qParams[0].value + '&format=json';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.get('/getschema', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
var url = ' http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=' + apiKey + '&appid=' + qParams[0].name;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.get('/getbans', function(req, res) {
	var qParams = [];
	for (var p in req.query) {
		qParams.push({'name':p, 'value':req.query[p]})
	}
var url = 'http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=' + apiKey + '&steamids=' + qParams[0].name;
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			console.log(body);
			res.send(body);
		}
	});	
});

app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
