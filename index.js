const express = require('express');
const cowsay = require('cowsay');
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const cors = require('cors');
const path = require('path');
const http = require("http");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = socketIo(server);

// const TweetStream = require('./TweetStream');
// const myStream = new TweetStream(io);
const TweetFinder = require('./TweetFinder');
const tweetFinder = new TweetFinder();

// Serve our api route /cow that returns a custom talking text cow
app.get('/api/cow/:say', cors(), async (req, res, next) => {
  try {
    const text = req.params.say;
    const moo = cowsay.say({ text });
    res.json({ moo });
  } catch (err) {
    next(err)
  }
});

// Serve our base route that returns a Hello World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    const moo = cowsay.say({ text: 'Hello World!' });
    res.json({ moo });
  } catch (err) {
    next(err);
  }
})


app.get('/api/get10/', cors(), async (req, res, next) => {
  try {
    const tweets = await tweetFinder.getRequest("quarantine");
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

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
