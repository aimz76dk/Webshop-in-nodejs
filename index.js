const MongoClient = require('mongodb').MongoClient

const mongodburl = 'mongodb://djaimz:1234@nodejs-shard-00-00-tgzri.mongodb.net:27017,nodejs-shard-00-01-tgzri.mongodb.net:27017,nodejs-shard-00-02-tgzri.mongodb.net:27017/webshop?ssl=true&replicaSet=nodejs-shard-0&authSource=admin';

MongoClient.connect(mongodburl, function(err, db){

   /* if (err) {
        console.log(err);
    } else {
        console.log('Connected to db: ' + db.databaseName)
    } */

    var dbCustomers = db.collection('customers');
    

    db.close();
});