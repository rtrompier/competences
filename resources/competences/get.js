cancelUnless(me, "You are not logged in", 401);
// si situation requete, ne pas afficher les situations
if(!query.situations && !query.mini){
    dpd.situations.get({competenceId : this.id, competences : 1}, function(situations) {
       if(situations) this.situations = situations;
    });
}


