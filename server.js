const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = process.env.PORT || 3000;  // For Heroku, dynamic port assign

app.use(express.static('dist'));
app.use(express.static('./'));
app.use(bodyParser.json());

var https = require('https');

var moment = require('moment');
var tm = moment().format('MMMM Do YYYY, h:mm:ss a');

var timestamp = + new Date();
var temp = "** Welcome to Group Chat! created on \n" + tm;

// "**********************************\n" + 
// "*                                *\n" +
// "*     Welcome to Group Chat!     *\n" +
// "*                                *\n" +
//"**********************************\n";

console.log(temp);

// Body of admin message 
var post_data = JSON.stringify({
  "message_type": "ADMM",
  "message": temp,
  "created_at": timestamp 
});
//console.log('\n\nCreated on ==> ' + DateCreated);

// GET
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

// POST - for Webhook
app.post("/webhook", (req, res) => {
  res.sendStatus(200);  // responds to the server with 200 - successfully received

  const channel_url = req.body.channel.channel_url;

  var post_options = {
    host: 'api-F58FD34C-1E49-41AE-ACB4-F82B889ABAE1.sendbird.com',
    path: '/v3/group_channels/' + channel_url + '/messages',
    method: 'POST',
    headers: {
      "Content-Type": "application/json, charset=utf8",
      "Api-Token": process.env.API_KEY   // read from .env
    }
  };
  
  var req = https.request(post_options, function(res) {
    res.on('data', function (chunk) {
        console.log('Response => ' + chunk);
    });
  });

  req.write(post_data);
  req.end();  
});

// var timestamp = 1545186677000;
// var date = new Date(timestamp);
//console.log(date);

//app.listen(PORT);
//console.log(`[SERVER RUNNING] 127.0.0.1:${PORT}`);
app.listen(PORT, function(){
  console.log("Server listening on port %d in %s mode", PORT, app.settings.env);
});
