var indico = require("indico.io"),
    Request = require("./Request"),
    http    = require("https");
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
        let url ="";
        Request(url, (posts) => {
            let tags = [];
            for(var i = 0; i < posts.length; i++){

            }
        });

    }
    return {
        //public methods
        getTags: function(req,res){
            getTags(req,res);
        }
    };
})();
