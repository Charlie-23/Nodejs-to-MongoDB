var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// make Promise version of fs.readdir()
fs.readdirAsync = function(dirname) 
{
    return new Promise(function(resolve, reject) 
    {
        fs.readdir(dirname, function(err, filenames)
        {
            if (err) 
                reject(err); 
            else 
                resolve(filenames);
        });
    });
};

// make Promise version of fs.readFile()
fs.readFileAsync = function(filename, enc) 
{
    return new Promise(function(resolve, reject) 
    {
        fs.readFile(filename, enc, function(err, data)
        {
            if (err) 
                reject(err); 
            else
                resolve(data);
        });
    });
};

// utility function, return Promise
function getFile(filename) 
{
    return fs.readFileAsync('./data/'+filename, 'utf8');
}

//filter
function isDataFile(filename) 
{
  return (filename.split('.')[1] == 'json')
}
// Reading the data from the json files and pushing it MongoDB
fs.readdirAsync('./data/').then(function (filenames)
{
    filenames = filenames.filter(isDataFile);
    console.log(filenames);
    return Promise.all(filenames.map(getFile));
}).then(function (files)
    {
        var summaryFiles = [];
        files.forEach(function(file) 
        {
            // Content from Json files after parsing 
            var json_file = JSON.parse(file);
            console.log(json_file);
            //connecting to database
            MongoClient.connect(url, function(err, db) 
            {
                if (err) throw err;
                var dbo = db.db("mydb");
            // inserting the retrived info from Json files to MongoDB   
                dbo.collection("Users").insertOne(json_file, function(err, res) 
                {
                  if (err) throw err;
                  console.log("document inserted");
                  db.close();
                });
              });

        });
    });
