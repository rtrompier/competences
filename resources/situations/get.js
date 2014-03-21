// Cancel si pas loggé
cancelUnless(me, "You are not logged in", 401);

// Requete du nombre de situation de l'user
dpd.users.get({id : me.id}, function(user) {
    
    // si < à 3 :
    if (user.nbSituation < 3){
        // On affiche que les siennes
        if (!isMe(this.userId)) {
            cancel("not yours", 401);
        }
    }
    // si la requete viens de competences (parent) on affiche pas la competence
    if(!query.competences){
        dpd.competences.get({id : this.competenceId, situations : 1}, function(competence) {
            this.competence = competence;
        });
    }
});
