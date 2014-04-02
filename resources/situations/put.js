cancelUnless(me, "You are not logged in", 401);

cancelIf(previous.userId != me.id, "Not yours" , 401);

// incrémente la variable nbSituation de la collections competences
dpd.competences.put({id : this.competenceId, nbSituations : {$inc: 1}});
dpd.competences.put({id : previous.competenceId, nbSituations : {$inc: -1}});

protect("userId");
    



