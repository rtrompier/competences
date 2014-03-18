var express = require('express'),
    competence = require('./routes/competences'),
    situation = require('./routes/situations'),
    cors = require('cors');

var app = express();
app.use(cors());
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/competences', competence.findAll);
app.get('/competences/:id', competence.findById);
app.post('/competences', competence.addCompetence);
app.put('/competences/:id', competence.updateCompetence);
app.delete('/competences/:id', competence.deleteCompetence);

app.get('/situations', situation.findAll);
app.get('/situations/:id', situation.findById);
app.post('/situations', situation.addSituation);
app.put('/situations/:id', situation.updateSituation);
app.delete('/situations/:id', situation.deleteSituation);
 
app.listen(3000);
console.log('Listening on port 3000...');
