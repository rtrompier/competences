// Cancel si pas loggé
cancelUnless(me, "You are not logged in", 401);


if(!query.competences){
        dpd.competences.get({id : this.competenceId, situations : 1}, function(competence) {
            if(competence) this.competence = competence;
        });  
}

 if(query.mini){
        hide("besoinEntreprise");
        hide("travailDemande");
        hide("contraintes");
        hide("chronologiquement");
        hide("resultat");
        hide("retour");
    }  


