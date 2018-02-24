var express = require("express"),
    Twitter = require("./src/Twitter"),
    Reddit  = require("./src/Reddit"),
    app     = express();

/**
 * Get subreddits related to users tweets format into a multi
 * @param req.query.q twitter username
 * @return link to multireddit
 */
app.get("/multireddits", function(req,res){
    let data = Twitter.getTags(req,res);
});
app.get("/test", function(req,res){
  Reddit.createMulti(res,["anime", "technology", "gender_issues"]);
})

let port = 3000; //change to heroku later
app.listen(port, function(err){
    if(err) throw error;
    console.log("Tweddit is online!");
})
