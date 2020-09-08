const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

var TweetFinder = function() {}

TweetFinder.prototype.getRequest = async function(query) {
  const token = process.env.TWITTER_V2_BEARER;
  const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

  // Edit query parameters below
  const params = {
    'query': query
    // 'tweet.fields': 'author_id'
  }

  const res = await needle('get', endpointUrl, params, { headers: {
    "authorization": `Bearer ${token}`
  }})

  if(res.body) {
    return res.body;
  } else {
    throw new Error ('Unsuccessful request')
  }
}

module.exports = TweetFinder;

// (async () => {
//
//     try {
//         // Make request
//         const response = await getRequest();
//         console.log(response)
//
//     } catch(e) {
//         console.log(e);
//         process.exit(-1);
//     }
//     process.exit();
//   })();
