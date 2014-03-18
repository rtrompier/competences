var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true,safe: false, strict: false});
db = new Db('comp', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'situationdb' database");
        db.collection('situations', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'situation' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving situations: ' + id);
    db.collection('situations', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    db.collection('situations', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.addSituation = function(req, res) {
    var situation = req.body;
    console.log('Add situation: ' + JSON.stringify(situation));
    db.collection('situation', function(err, collection) {
        collection.insert(situation, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.updateSituation = function(req, res) {
    var id = req.params.id;
    var situation = req.body;
    console.log('Updating situation: ' + id);
    console.log(JSON.stringify(situation));
    db.collection('situations', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, situation, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating situation: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(situation);
            }
        });
    });
}
 
exports.deleteSituation = function(req, res) {
    var id = req.params.id;
    console.log('Deleting situation: ' + id);
    db.collection('situations', function(err, collection) {
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
 
    var situations = [
    {
        competence_id : "",
        year: "2011",
        lieu: "entreprise",
        besoin_entreprise : "Répondre à la demande du client qui veut renouveller son image sur internet.",
        travail_demande: "On m’a demandé d’intégrer la nouvelle maquette d’un site web client (reéalisée par le webdesigner) et de mettre en place son site internet.",
        contraintes:    [
                        "Découper une maquette Photoshop",
                        "Coder en HTML/CSS",
                        "Créer l’archive d’un Template Joomla",
                        "Installer et configurer le Template"
                        ],
        chronologiquement:  [
                            "Découper la maquette sous Photoshop",
                            "Intégrer en HTML",
                            "Charter le site en CSS",
                            "Creer les positions pour les modules Joomla",
                            "Créer l’archive avec tous les fichiers à mettre en place pour un Template Joomla",
                            "Installation du Template sur un CMS Joomla",
                            "Configurer le site Joomla",
                            "Mettre en place le contenu"
                            ],
        resultat: ["D’après moi le reésultat est bon, le site sous Joomla correspond parfaitement à la maquette réalisée par le webdesigner."],
        retour: "NC"
    },
    {
        competence_id : "",
        year: "2011",
        lieu: "entreprise",
        besoin_entreprise : "Répondre à la demande du client qui veut améliorer sa visibilité sur les moteurs de recherche.",
        travail_demande: "On m’a demandé de référencer le site d’un client en l’inscrivant dans les annuaires spécialisés et généralistes.",
        contraintes:    [
                        "Inscrire dans des annuaires gratuits de qualité",
                        ],
        chronologiquement:  [
                            "Inscrire le site dans les annuaires",
                            ],
        resultat: ["D’apreès moi le résultat est bon, le site du client a fortement amélioré son positionnement sur Google."],
        retour: "NC"
    }
    ];
 
    db.collection('situations', function(err, collection) {
        collection.insert(situations, {safe:true}, function(err, result) {});
    });
 
};
