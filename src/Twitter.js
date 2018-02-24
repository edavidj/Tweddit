var indico = require("indico.io"),
    Reddit = require("./Reddit"),
    Request = require("./Request"),
    Twitter = require("twitter"),
    async   = require("async"),
    http    = require("https");
indico.apiKey = "a94abe43d1aea51d0b891c7d09a781ae";
var client = new Twitter({
    consumer_key: "rbh01lSKaAUfGZ1x7ikJGnOQi",
    consumer_secret: "M2hReBNQNKTM8mxtNfmCy86RkxBbctpXgGhdQK8eCJybioXnJ3",
    access_token_key:"1038895591-xW0tMPneNFXloxFVshZ5hZvUEUQeBxbP1TQjM8y",
    access_token_secret:"j3e41BNZ9NsujASwBptK3RJQu5e3DVS9Hr0q0SMlDrkN7"
})
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
    function getTags(req,res){
        let user = req.query.q;
        let params = {screen_name:'Imaqtpielol'};
        client.get('statuses/user_timeline', params, (err, tweets, response) => {
            var tags = [];
            async.each(tweets, function(tweet, callback){
                indico.text_tags(tweet.text)
                .then(parseIndico)
                .then((tag) => {
                    if(tag !== undefined){ tags.push(tag);}
                    callback();
                });
            }, function(err){
                if(err) throw err;
                Reddit.createMulti(res,tags);
            })           
        });

    }
    return {
        //public methods
        getTags: function(req,res){
            getTags(req,res);
        }
    };
})();
