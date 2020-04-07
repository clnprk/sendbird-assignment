const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//const PORT = 9000;
const PORT = process.env.PORT || 9000;

app.use(express.static('dist'));
app.use(express.static('./'));
app.use(bodyParser.json());


const users = [
  {
      id: "rjames",
      name: "LeBron James",
      email: "james@gmail.com"
  },
  {
      id: "scurry",
      name: "Stephen Curry",
      email: "scurry@gmail.com"
  }
];


app.get('/', function(req, res) {
  res.sendfile('index.html');
});

// POST message
app.get("/", (req, res) => {
  console.log("Received POST message from the server");
  res.json(users);    
});

//app.listen(PORT);
//console.log(`[SERVER RUNNING] 127.0.0.1:${PORT}`);
app.listen(PORT, function(){
  console.log("Server listening on port %d in %s mode", PORT, app.settings.env);
});
