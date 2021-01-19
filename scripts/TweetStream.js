const needle = require('needle');
const socketIo = require("socket.io");

var TweetStream = function(io){

  // The code below sets the bearer token from your environment variables
  // To set environment variables on Mac OS X, run the export command below from the terminal:
  // export BEARER_TOKEN='YOUR-TOKEN'
  const token = process.env.TWITTER_V2_BEARER;
  const rulesURL = 'https://api.twitter.com/2/tweets/search/stream/rules';
  const streamURL = 'https://api.twitter.com/2/tweets/search/stream';

  // Edit rules as desired here below
  const rules = [
    // { 'value': 'dog has:images -is:retweet', 'tag': 'dog pictures' },
    // { 'value': 'cat has:images -grumpy', 'tag': 'cat pictures' },
    { 'value': 'dog', 'tag': 'psalm' }
  ];

  async function getAllRules() {

    const callback = function(response, err) {
      console.log("Called back 1");
      if (err) console.log(err);
      // else console.log(resp);
    };
    const response = await needle('get', rulesURL, { headers: {
      "authorization": `Bearer ${token}`
    }}, callback)

    if (response.statusCode !== 200) {
      console.log("NO BODY");
      throw new Error(response.body);
      return null;
    }

    return (response.body);
  }

  async function deleteAllRules(rules) {
    console.log("DELETING RULES");
    if (!Array.isArray(rules.data)) {
      return null;
    }

    const ids = rules.data.map(rule => rule.id);

    const data = {
      "delete": {
        "ids": ids
      }
    }

    const callback = function(resp, err) {
      console.log("Called back 2");
    };

    const response = await needle('post', rulesURL, data, {headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    }}, callback)

    if (response.statusCode !== 200) {
      throw new Error(response.body);
      return null;
    }

    return (response.body);

  }

  async function setRules() {

    const data = {
      "add": rules
    }

    const callback = function(resp, err) {
      console.log("Called back 3");
    };
    const response = await needle('post', rulesURL, data, {headers: {
      "content-type": "application/json",
      "authorization": `Bearer ${token}`
    }}, callback)

    if (response.statusCode !== 201) {
      throw new Error(response.body);
      return null;
    }

    return (response.body);

  }

  function streamConnect() {
    //Listen to the stream
    const options = {
      timeout: 20000
    }

    const stream = needle.get(streamURL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }, options);

    stream.on('data', data => {
      try {
        const json = JSON.parse(data);
        io.emit("tweet", data);
        console.log("TWEETED", json);
      } catch (e) {
        console.log("nope")
        // Keep alive signal received. Do nothing.
      }
    }).on('error', error => {
      if (error.code === 'ETIMEDOUT') {
        stream.emit('timeout');
      }
    });

    return stream;

  }


  (async () => {
    let currentRules;

    try {
      // Gets the complete list of rules currently applied to the stream
      currentRules = await getAllRules();

      // Delete all rules. Comment the line below if you want to keep your existing rules.
      await deleteAllRules(currentRules);

      // Add rules to the stream. Comment the line below if you don't want to add new rules.
      await setRules();

    } catch (e) {
      console.error("KILLING", JSON.stringify(e));
      // process.exit(-1);
    }

    // Listen to the stream.
    // This reconnection logic will attempt to reconnect when a disconnection is detected.
    // To avoid rate limites, this logic implements exponential backoff, so the wait time
    // will increase if the client cannot reconnect to the stream.

    const filteredStream = streamConnect()
    let timeout = 0;
    filteredStream.on('timeout', () => {
      // Reconnect on error
      console.warn('A connection error occurred. Reconnecting…');
      setTimeout(() => {
        timeout++;
        streamConnect(token);
      }, 2 ** timeout);
      streamConnect(token);
    })

  })();
}

module.exports = TweetStream;
