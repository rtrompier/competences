var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true,safe: false, strict: false,w:-2,journal:false,fsync:false});
db = new Db('comp', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'competencedb' database");
        db.collection('competences', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'competences' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving competences: ' + id);
    db.collection('competences', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('competences', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addCompetence = function(req, res) {
    var competence = req.body;
    console.log('Add competence: ' + JSON.stringify(competence));
    db.collection('competences', function(err, collection) {
        collection.insert(competence, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateCompetence = function(req, res) {
    var id = req.params.id;
    var competence = req.body;
    console.log('Updating competence: ' + id);
    console.log(JSON.stringify(competence));
    db.collection('competences', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, competence, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating competence: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(competence);
            }
        });
    });
}
 
exports.deleteCompetence = function(req, res) {
    var id = req.params.id;
    console.log('Deleting competence: ' + id);
    db.collection('competences', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var competences = [
    {
        name: "Constuire et intégrer un template Joomla",
        categorie: "Test",
    },
    {
        name: "Référencer un site naturellement (netlinking)",
        categorie: "Test",
    }
    ];
 
    db.collection('competences', function(err, collection) {
        collection.insert(competences, {safe:true}, function(err, result) {});
    });
 
};
