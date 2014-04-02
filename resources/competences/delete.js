cancelUnless(me, "You are not logged in", 401); 

    
cancelIf(this.nbSituations > 0, "Des situations sont encores associées", 401);