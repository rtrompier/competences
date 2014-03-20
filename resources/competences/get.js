cancelUnless(me, "You are not logged in", 401);

dpd.situations.get({comp : 1 , competenceid : this.id}, function(situations) {
    this.situations = situations;
});