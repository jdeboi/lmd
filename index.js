const express = require('express');
// const cowsay = require('cowsay');
const bodyParser = require("body-parser");
// const socketIo = require("socket.io");
const cors = require('cors');
const path = require('path');
const http = require("http");

const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

var io = module.exports.io = require('socket.io')(server);
const ClientManager = require('./websockets/ClientManager');
io.on('connection', ClientManager);


const TweetFinder = require('./TweetFinder');


app.post('/api/post/critique', cors(), async (req, res, next) => {
  try {
    fs.readFile('./critiques.json', function (err, data) {
      var json = JSON.parse(data)
      const crit = req.body;
      // crit.time = new Date();
      json.push(crit);
      fs.writeFile('./critiques.json', JSON.stringify(json), 'utf-8', function (err) {
        if (err) throw err
        console.log('ADDED CRIT', crit);
        io.emit("critique", crit);
        res.send(crit);
      })
    })
  } catch (err) {
    next(err);
    // console.log(err);
  }
})

app.get('/api/get/critiques/:room', cors(), async (req, res, next) => {
  try {
    const room = req.params.room;
    console.log("GET ROOM CRITS", room);
    fs.readFile('critiques.json', function (err, data) {
      const json = JSON.parse(data)
      const crits = json.filter(crit => crit.room == room);
      res.json(crits);
    })
  } catch (err) {
    next(err);
  }
})


app.get('/api/get/tweets/:query', cors(), async (req, res, next) => {
  const tf = new TweetFinder();
  try {
    const query = decodeURI(req.params.query);
    console.log("QUERY", query);
    const tweets = await tf.findTweets(query);
    res.json({ tweets });
  } catch (err) {
    next(err);
  }
})



// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})




// Choose the port and start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
