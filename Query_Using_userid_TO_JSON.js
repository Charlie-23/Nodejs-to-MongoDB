var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";




// start a blank output.json file
fs.writeFile('./output.json', '', function(){console.log('done')});

//connecting to database
MongoClient.connect(url, function(err, db) 
{
    if (err) throw err;
    var dbo = db.db("mydb");

    // query with particular user_id only
    var query = { user_id: 2 };

    dbo.collection("Users").find(query).toArray(function(err, result) 
    {
        if (err) throw err;
        console.log(result);
        //appending the result obtained through query
        fs.appendFile("./output.json", JSON.stringify(result, null, 4), function(err) 
        {
            if(err) 
            {
                return console.log(err);
            }
            console.log("The result was appended!");
        });
        db.close();
    });
});