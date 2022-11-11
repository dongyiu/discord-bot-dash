require('dotenv').config()
module.exports = {
  "clientID": process.env.clientID,
  "clientSecret": process.env.clientSecret,
  "callbackURL": process.env.callbackURL,
  "token": process.env.token,
  "mongo_url": process.env.mongo_url,
  "invite_link": "https://discord.com/api/oauth2/authorize?client_id=783306479721512960&permissions=8&redirect_uri=http%3A%2F%2Fwww.defbot.xyz%2Flogin&response_type=code&scope=identify%20email%20guilds%20bot%20applications.commands",
  "errors": {
    "01": "You are blacklisted",
    "403": "You are not allowed to access dashboard",
    "404": "Unable to find this page, cough cough",
    "0" : "Your appeal will now be reviewed and discussed between the admins. if u do not receive any dms from def bot in the next week you can assume your appeal has been denied.",
    "405" : "An error occured"
  }
}