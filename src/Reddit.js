const async     = require("async");
const snoowrap  = require("snoowrap")
const Request   = require("./Request");
const key       = "Un7AATWmZaSxPBN_Xw98toc1p50"

module.exports = (function(){

      const r = new snoowrap({
        userAgent: 'Tweedit by Mirira',
        clientId: '1kSrspmMM6VjyQ',
        clientSecret: 'vCuw5wjGs5b_HJYyPmx6ur-enfc',
        username: 'Mirira',
        password: '323450205',
        refreshToken: key
      })
    //private functions
    /**
     * Get related subreddits for each tag and create multi reddit from it
     * @param {Express Object} res res.send to send multi reddit link to front end
     * @param {String[]} tags tags from twitter analysis
     */
    function createMulti(res,tags){
      var subredditNames = [];
      async.each(tags, function(tag, callback){
          let options = {
            url:"https://oauth.reddit.com/api/subreddits_by_topic?query="+tag,
            headers:{
              'User-Agent':       'Tweedit by Mirira',
              "Authorization": "bearer " + key
            }
          }
//curl -X POST -d 'grant_type=password&username=Mirira&password=323450205' --user '1kSrspmMM6VjyQ:vCuw5wjGs5b_HJYyPmx6ur-enfc' https://www.reddit.com/api/v1/access_token
//curl -H "Authorization: bearer 9INSRKBgxfJJCpS5Y86fyta-v7I" -A "Tweedit by Mirira" https://oauth.reddit.com/api/subreddits_by_topic?query=technology
          Request(res, options, (subreddits) => {
              subredditNames = subredditNames.concat(JSON.parse(subreddits));
              callback();
          });
        }, function(err){
            if(err) throw err;
            let formattedSubs = [];
            for(var i of subredditNames){
              formattedSubs.push({
                "name":i.name
              });
            }
            console.log(formattedSubs);
            // let json_data = {
            //   "description_md":"No",
            //   "display_name": "test",
            //   "icon_name": "None",
            //   "key_color":"#AABBCC",
            //   "subreddits": [{"name": "anime"}],
            //   "visibility":"public",
            //   "weighting_scheme": "classic",
            // }
            // let multi_options = {
            //   url:"https://oauth.reddit.com/api/multi/multipath",
            //   method:"POST",
            //   body: {
            //     model:json_data,
            //     multipath: "/test"
            //   },
            //   headers:{
            //     'User-Agent':       'Tweedit by Mirira',
            //     "Authorization": "bearer " + key
            //   },
            //   json:true
            // }
            // Request(res,multi_options, (response) => {
            //   console.log(response);
            // });
            var multiReddit = r.getUser('mirira').getMultireddit('tweedit').copy({'mirira': 'tweedit_mirira'}).toJSON();
            console.log(multiReddit);
                   // for(var i of formattedSubs){
                   //   multiReddit.addSubreddit(i);
                   // }
                //})

        });
    }
    return {
        //public methods
        createMulti: function(res, tags){
            createMulti(res,tags);
        }
    };
})();
