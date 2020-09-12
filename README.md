images to deal with
* waveforms divine gif
* waveforms devil png (added to s3)
* confessions txt png
* mars bubbles1 (added to s3/mars)

created using:

https://medium.com/@chloechong.us/how-to-deploy-a-create-react-app-with-an-express-backend-to-heroku-32decfee6d18

e.g.
heroku config:set GITHUB_USERNAME=joesmith

env variable
https://devcenter.heroku.com/articles/heroku-local


basically have to reinstall node if ec2 restarts unless you create AMI
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html

cross origin on videos
https://github.com/ml5js/ml5-library/issues/217

heroku local with nodemon
nodemon --exec "heroku local" --signal SIGTERM
