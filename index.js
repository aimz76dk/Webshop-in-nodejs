
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const mongodburl = 'mongodb://djaimz:1234@nodejs-shard-00-00-tgzri.mongodb.net:27017,nodejs-shard-00-01-tgzri.mongodb.net:27017,nodejs-shard-00-02-tgzri.mongodb.net:27017/webshop?ssl=true&replicaSet=nodejs-shard-0&authSource=admin';

const publicPath = __dirname;

app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res) {
    res.sendFile(publicPath + '/home.html', function (err) {
        // handle error
    });
});

// Read one
app.get('/customers/:id', function (req, res) {
    
        MongoClient.connect(mongodburl, function (err, db) {
            var col = db.collection('customers');
    
            col.findOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
                res.json(result);
            })
            db.close();
        });
    });

// Read All
app.get('/customers', function(req, res) {

    MongoClient.connect(mongodburl, function(err, db) {
        /* if (err) {
            console.log(err);
        } else {
            console.log('Connected to db: ' + db.databaseName)
        } */
    
        var dbCustomers = db.collection('customers');
        
        dbCustomers.find().toArray(function (err, result) {
            
            res.json(result);
        });
        db.close();
    });
});

// Create
app.post('/customers/', function (req, res) {
    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('customers');

        col.insertOne(req.body, function(err , result){
            res.status(201);
            res.json({msg : 'Customer Created'});
        })
        db.close();
    });
});

// Update
app.put('/customers/:id', function (req, res) {
    
    MongoClient.connect(mongodburl, function (err, db) {
        var col = db.collection('customers');
        var userToUpdate = req.params.id;
        col.update({ _id: ObjectId(userToUpdate)}, req.body, function (err, result) {
            res.send(
                (err === null) ? {msg: 'Customer updated'} : {msg: err}
            );
        });
        
        db.close();
    });
});


// Delete
app.delete('/customers/:id', function (req, res) {
    
        MongoClient.connect(mongodburl, function (err, db) {
            var col = db.collection('customers');
    
            col.deleteOne({ '_id': ObjectId(req.params.id) }, function (err, result) {
                res.status(204);
                res.json();
    
            });
    
            db.close();
        });
    });

var Emitter = require('events');
var emtr = new Emitter();

emtr.on('eventHappend', function(){
    console.log('It goddamn worked!')
})

emtr.emit('eventHappend');

//app.listen(3000);

