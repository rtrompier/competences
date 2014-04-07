cancelUnless(me, "You are not logged in", 401);

cancelIf(previous.userId != me.id, "Not yours" , 401);

// incrémente la variable nbSituation de la collections competences
dpd.competences.put({id : this.competenceId, nbSituations : {$inc: 1}},function(){
    dpd.competences.put({id : previous.competenceId, nbSituations : {$inc: -1}},function(){
        dpd.competences.get({id : this.competenceId, situations : 1}, function(competence) {
            if(competence) this.competence = competence;
        });  
    });
});

protect("userId");
    



