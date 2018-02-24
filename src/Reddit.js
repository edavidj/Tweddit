module.exports = (function(){
    //private functions
    /**
     * Get related subreddits for each tag and create multi reddit from it
     * @param {Express Object} res res.send to send multi reddit link to front end
     * @param {String[]} tags tags from twitter analysis
     */
    function createMulti(res,tags){
        //do the thing
    }
    return {
        //public methods
        createMulti: function(res, tags){
            createMulti(res,tags);
        }
    };
})();