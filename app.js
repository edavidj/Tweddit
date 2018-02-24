var express = require("express"),
    Twitter = require("./src/Twitter"),
    Reddit  = require("./src/Reddit"),
    passport = require("passport"),
    TwitterStrategy = require("passport-twitter"),
    app     = express();



// passport.use(new TwitterStrategy({
//     consumerKey: "rbh01lSKaAUfGZ1x7ikJGnOQi",
//     consumerSecret: "M2hReBNQNKTM8mxtNfmCy86RkxBbctpXgGhdQK8eCJybioXnJ3",
//     callbackURL:"https://powerful-coast-51545.herokuapp.com/auth/twitter/callback"
// }), function(token, tokenSecret, profile, cb){
//     User.findOrCreate({twitterId: profile.id}, function(err, user){

//     })
// });
/**
 * Get subreddits related to users tweets format into a multi
 * @param req.query.q twitter username
 * @return link to multireddit
 */
app.get("/multireddits", function(req,res){
    console.log(req.body);
    let data = Twitter.getTags(req,res);
});
app.get("/test", function(req,res){
  Reddit.createMulti(res,["anime", "technology", "gender_issues"]);
})
app.get("/auth/twitter", function(req,res){
    passport.authenticate('twitter');
});
app.get("/auth/twitter/callback", function(req,res){
    passport.authenticate('twitter', {failureRedirect: '/'}),
    function(req,res){
        res.send("success");
    }
})
