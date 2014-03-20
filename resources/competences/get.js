cancelUnless(me, "You are not logged in", 401);

// si situation requete, ne pas afficher les situations
if(!query.situations){
    dpd.situations.get({comp : 1 , competenceid : this.id}, function(situations) {
        this.situations = situations;
    });
}