var indico = require("indico.io"),
    Reddit = require("./Reddit"),
    Request = require("./Request"),
    http    = require("https");
indico.apiKey = "a94abe43d1aea51d0b891c7d09a781ae";
module.exports = (function(){
    //private functions
    /**
     * Get timeline posts
     * @param {String} user 
     */
    var parseIndico = (res) => {
        //clarify that res structure is just api response
        let maxKey = "anime";
        let keys = Object.keys(res);
        for(var i of keys){
            if(res[i] > res[maxKey]) { 
                maxKey = res[i];
            }
        }
        return maxKey;
    }
    function getTags(req,res){
        let user = req.query.q;
        let options = {

        }
        Request(options, (posts) => {
            let tags = [];
            for(var i = 0; i < posts.length; i++){
                indico.text_tags(posts[i].text)
                .then(parseIndico)
                .then((tag) => {
                    tags.push(tag);
                });
            }
            console.log(tags);
            // Reddit.createMulti(tags);
        });
    }
    return {
        //public methods
        getTags: function(req,res){
            getTags(req,res);
        }
    };
})();