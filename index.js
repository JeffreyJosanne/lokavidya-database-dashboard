var express = require('express');
var ParseDashboard = require('parse-dashboard');
var path = require('path');
var fs = require('fs');

var serverConfigDir = path.join(__dirname);
var data = fs.readFileSync(path.join(serverConfigDir, 'parse-dashboard-config.json'));
var config;

try {
	config = JSON.parse(data);
} catch (err) {
	console.log('parse-database-config.json is corrputed')
	throw(err);
}

var dashboard = new ParseDashboard(config);

var app = express();

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(8080);