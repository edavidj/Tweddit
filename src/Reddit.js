const async     = require("async");
const snoowrap  = require("snoowrap");
const Request   = require("./Request");
const randtoken = require("rand-token");
const key       = "mLsQ-K60y8_5dFEqcWtRNhXKw8s";
var token       = randtoken.generate(16);

module.exports = (function(){

      const r = new snoowrap({
        userAgent: 'Tweedit by Mirira',
        clientId: '1kSrspmMM6VjyQ',
        clientSecret: 'vCuw5wjGs5b_HJYyPmx6ur-enfc',
        username: 'Mirira',
        password: '323450205',
        accessToken: key
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
            multiReddit(formattedSubs);
            //res.send(JSON.stringify(prioritySort(formattedSubs)));
        });
    }

    function multiReddit(fs){
        let creatingMultiReddit = [];
        r.getUser('mirira').getMultireddit('tweedit').copy({newName: token})
        .then(function(multiRed){
            console.log("i dont know why this is right nor why it is wrong")
        }).catch(function(err){
            // console.log(err)
        });
        r.getUser('mirira').getMultireddit(token).edit({visibility:'public'})
        for (var i = 0; i < fs.length; i++) {
            if (i > 100) {
                break
            }
            creatingMultiReddit.push(r.getUser('mirira').getMultireddit(token).addSubreddit(fs[i].name));
        }
    }

    function prioritySort(data){
        var checked = new Set();
        var counts = {};
        var output = [];
        for(var i = 0; i < data.length; i++){
            if(!checked.has(data[i].name)){
                checked.add(data[i].name);
                counts[data[i].name] = 1;
            } else {
                counts[data[i].name]++;
            }
        }
        let keys = Object.keys(counts);
        for(var j = 0; j < keys.length; j++){
            let o = {}
            o[keys[j]] = counts[keys[j]];
            output.push( o );
        }
        output.sort(function(a,b){
            let cA = Object.values(a)[0];
            let cB = Object.values(b)[0];
            if(cA > cB){ return -1;}
            if(cB > cA){ return 1;}
            return 0;
        });
        let finalOut = [];
        for(var k = 0; k < output.length; k++){
            let key = Object.keys(output[k])[0];
            finalOut.push(key);
        }
        return finalOut;
    }
    return {

        //public methods
        createMulti: function(res, tags){
            createMulti(res,tags);
         },test: function(res){
        // let multi_copy = {
        //     url:"https://oauth.reddit.com/api/multi/copy",
        //     method:"POST",
        //     body: {
        //       display_name: "tweeditcopy",
        //       from: "user/Mirira/m/tweedit",
        //       to: "user/edavidj1"
        //     },
        //     headers:{
        //       'User-Agent': 'Tweedit by Mirira',
        //       "Authorization": "bearer " + key
        //     },
        //     json: true
        //   }
        //   Request(res, multi_copy, (response)=>{
        //     res.send(response);
        //   })
        //  }
    }
    };
})();
