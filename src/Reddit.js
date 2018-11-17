const async     = require("async");
const snoowrap  = require("snoowrap");
const Request   = require("./Request");
const randtoken = require("rand-token");
const key       =  process.env.REDDIT_KEY;


module.exports = (function(){

      const r = new snoowrap({
        userAgent: 'Tweedit by Mirira',
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        username: 'Mirira',
        password: process.env.REDDIT_PASS,
        accessToken: key
      })
    //private functions
    /**
     * Get related subreddits for each tag and create multi reddit from it
     * @param {Express Object} res res.send to send multi reddit link to front end
     * @param {String[]} tags tags from twitter analysis
     */
    function createMulti(res,tags){
      const subredditNames = [];
      async.each(tags, function(tag, callback){
          let options = {
            url:"https://oauth.reddit.com/api/subreddits_by_topic?query="+tag,
            headers:{
              'User-Agent':       'Tweedit by Mirira',
              "Authorization": "bearer " + key
            }
          }
          Request(res, options, (subreddits) => {
              subredditNames = subredditNames.concat(JSON.parse(subreddits));
              callback();
          });
        }, (err) => {
            if(err) throw err;
            let formattedSubs = [];
            for(var i of subredditNames){
              formattedSubs.push({
                "name":i.name
              });
            }
            let outputArray = prioritySort(formattedSubs);
            console.log(outputArray);
            let multireddit = "https://reddit.com/user/Mirira/m/"+multiReddit(outputArray);
            res.json({
                loggedIn: true, //not camel case smh
                data: outputArray,
                multireddit : multireddit
            });
            // multiReddit(formattedSubs);
            //res.send(JSON.stringify(prioritySort(formattedSubs)));
        });
    }

    function multiReddit(fs){
        let creatingMultiReddit = [];
        var token       = randtoken.generate(16);
        r.getUser('mirira').getMultireddit('tweedit').copy({newName: token})
        .then(function(multiRed){
            console.log("i dont know why this is right nor why it is wrong")
        }).catch(function(err){
            // console.log(err)
        });
        r.getUser('mirira').getMultireddit(token).edit({visibility:'public'})
        for (let i = 0; i < fs.length; i++) {
            if (i >= 100) {
                break
            }
            creatingMultiReddit.push(r.getUser('mirira').getMultireddit(token).addSubreddit(fs[i]));
        }
        return token
    }

    function prioritySort(data){
        const checked = new Set();
        const counts = {};
        const output = [];
        for(let i = 0; i < data.length; i++){
            if(!checked.has(data[i].name)){
                checked.add(data[i].name);
                counts[data[i].name] = 1;
            } else {
                counts[data[i].name]++;
            }
        }
        let keys = Object.keys(counts);
        for(let j = 0; j < keys.length; j++){
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
        for(let k = 0; k < output.length; k++){
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
    }
    };
})();
