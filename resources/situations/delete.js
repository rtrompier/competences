cancelUnless(me, "You are not logged in", 401);
cancelIf(this.userId != me.id, "Not yours", 401);

dpd.competences.put({id : this.competenceId, nbSituations : {$inc: -1}});