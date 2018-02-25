var indico = require("indico.io"),
    Reddit = require("./Reddit"),
    Request = require("./Request"),
    Twitter = require("twitter"),
    async   = require("async"),
    passport = require("passport"),
    TwitterStrategy = require("passport-twitter"),
    http    = require("https");

indico.apiKey = "a94abe43d1aea51d0b891c7d09a781ae";
var client = new Twitter({
<<<<<<< HEAD
    consumer_key: "5UkW1lm6uIi3sqjW59C1XPlYs",
    consumer_secret: "d9j5XinzrnPUpgAzzHcifzgVjLpN65PvfgttAM5TPPzAksx8Od",
    access_token_key:"1038895591-NKLUo7VqURfU3HGbLCgUbYIRYBwwSD5LB0vWEcM",
    access_token_secret:"sXLhKWqJKOkJlkScAJJdu1xY66LRDOfOcCyIq5vYG5o0m"
});
=======
    consumer_key: "rbh01lSKaAUfGZ1x7ikJGnOQi",
    consumer_secret: "M2hReBNQNKTM8mxtNfmCy86RkxBbctpXgGhdQK8eCJybioXnJ3",
    access_token_key:"1038895591-xW0tMPneNFXloxFVshZ5hZvUEUQeBxbP1TQjM8y",
    access_token_secret:"j3e41BNZ9NsujASwBptK3RJQu5e3DVS9Hr0q0SMlDrkN7"
})
>>>>>>> a6e78bc34a9ff475bc7b5f992fdab30d51aa6f1c
module.exports = (function(){
    //private functions
    /**
     * Get timeline posts
     * @param {String} user
     */
    var parseIndico = (res) => {
        //clarify that res structure is just api response
        let maxKey;
        let keys = Object.keys(res);
        for(var i of keys){
            if(maxKey === undefined && res[i] > 0.05){ maxKey = i;}
            else if(res[i] > res[maxKey] && res[i] > 0.05) {
                maxKey = i;
            }
        }
        return maxKey;
    }
    function getTags(user,res){
        user = user.slice(1,user.length);
        console.log(user);
        let params = {screen_name:user};
        client.get('statuses/user_timeline', params, (err, tweets, response) => {
            var tags = [];
            // console.log(err);
            // console.log(tweets);
            // console.log(response);
            async.each(tweets, function(tweet, callback){
                indico.text_tags(tweet.text)
                .then(parseIndico)
                .then((tag) => {
                    indico.sentiment(tweet.text)
                      .then((sentiments) => {
                        if((tag !== undefined) && (sentiments >= 0.40)){
                            tags.push(tag);
                        }

                        console.log("yes")
                        callback();
                        })
                    })
                }, function(err){
                    if(err) throw err;
                    res.send(tags);
                    Reddit.createMulti(res,tags);
                });
            });
    }
    return {
        //public methods
        getTags: function(user,res){
            getTags(user,res);
        }
    };
})();
