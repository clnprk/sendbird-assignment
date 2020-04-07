const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//const PORT = 3000;
const PORT = process.env.PORT || 3000;  // For Heroku, dynamic port assign

app.use(express.static('dist'));
app.use(express.static('./'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
  
var headers = {
  'Content-Type': 'application/json, charset=utf8',
  'Api-Token': '541a1e5f356158b8d337d00cdb08df754ba4efc1' // Secondary API token
};

// GET
app.get('/', function(req, res) {
  res.sendfile('index.html');
});

// POST - for Webhook
app.post("/webhook", (req, res) => {
  console.log("Received POST message from the server");
  res.sendStatus(200);  // responds with 200 - successfully received
  console.log(req.body);

  const ChannelURL = req.body.channel.channel_url;
  console.log('Channel url => ' + ChannelURL);
  const AdminMsg = {
    "message_type":"ADMM",
    "message": "Welcome to Group Channel!"
  }
  console.log('Admin msg => ' + JSON.stringify(AdminMsg));

  var options = {
    host: 'api-F58FD34C-1E49-41AE-ACB4-F82B889ABAE1.sendbird.com',
    path: '/v3/group_channels/' + ChannelURL + '/messages',
    method: 'POST',
    //json: true,
    header: headers,
    body: AdminMsg
  };
  console.log('Data to send =>' + JSON.stringify(options));

  // Request admin message
  var https = require('https'); 
  var req = https.request(options, function(res) {
    console.log('Status => ' + res.statusCode);
  });

  req.end();  // No more request
});


//app.listen(PORT);
//console.log(`[SERVER RUNNING] 127.0.0.1:${PORT}`);
app.listen(PORT, function(){
  console.log("Server listening on port %d in %s mode", PORT, app.settings.env);
});
