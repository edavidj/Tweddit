var indico = require("indico.io"),
    Request = require("./Request"),
    http    = require("https");
module.exports = (function(){
    //private functions
    /**
     * Get timeline posts
     * @param {String} user 
     */
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