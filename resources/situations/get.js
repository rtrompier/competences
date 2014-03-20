// Cancel si pas loggé
cancelUnless(me, "You are not logged in", 401);

// Requete du nombre de situation de l'user
dpd.users.get({id : me.id}, function(user) {
    // si < à 3 :
    if (user.nbSituation < 2){
        // On affiche que les siennes
        if (!isMe(this.userid)) {
            cancel("not yours", 401);
        }
    }
    // si la requete viens de competences (parent) on affiche pas la competence
    if(!query.comp){
        dpd.competences.get({id : this.competenceid, situations : 1}, function(competence) {
            this.competence = competence;
        });
    }
});
