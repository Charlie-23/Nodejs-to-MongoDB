//Run this file to drop the collection User from database
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) 
{
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("Users").drop(function(err, delOK) 
  {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});