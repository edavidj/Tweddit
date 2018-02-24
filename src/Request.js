module.exports =  function request(url, callback){
    return https.get(url, (resp) => {        
        let data = "";
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            utfstring = unescape(encodeURIComponent(data));
            callback(JSON.parse(utfstring));
        });        
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}