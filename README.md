# Nodejs-to-MongoDB
Reading multiple Json files and pushing the read objects to MongoDB and retrieving data from database in Json format

# Reading Multiple files Asynchronously but Processing file content synchronously
For processing a single file, one could use callback function in javascript to achieve this easily, but for multiple files, it is not a good style. For reading multiple files we can use  sync versions of fs functions or Promises. Using sync versions of fs functions would block each file reading and possibly result in slow reading if you have a large number of files.

# Promise
A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

# Dependencies:
npm install mongodb

Install all the dependencies and you are good to go on node.
