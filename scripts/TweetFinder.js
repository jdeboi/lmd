const needle = require('needle');

// The code below sets the bearer token from your environment variables
// To set environment variables on Mac OS X, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'

var TweetFinder = function() {

  const token = process.env.TWITTER_V2_BEARER;
  const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

  this.getRequest = async function(query) {

    // Edit query parameters below

    // advanced queries https://github.com/igorbrigadir/twitter-advanced-search
    const params = {
      'query': query + " -RT lang:en",
      'tweet.fields': 'attachments,author_id,created_at,public_metrics',
      'expansions': 'author_id',
      'user.fields': 'profile_image_url,url'
    }

    const callback = function(err, res) {
      console.log("calling callback in needle... dunno why");
    };

    const res = await needle('get', endpointUrl, params,
    { headers: {
      "authorization": `Bearer ${token}`
    }},
    callback
  )



    if(res.body) {
      return res.body;
    } else {
      throw new Error ('Unsuccessful request')
    }
  }

  this.findTweets = async function(query) {
    try {
      // Make request
      const response = await this.getRequest(query);
      // console.log(response)
      return response;
    } catch(e) {
      console.log(e);
      return null;
    }
    return null;
  }
}

// TweetFinder.prototype

module.exports = TweetFinder;
