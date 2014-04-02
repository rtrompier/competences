cancelUnless(me, "You are not logged in", 401);
console.log(this);
this.userId = me.id;
dpd.users.get({id : me.id}, function(user){
    this.userName = user.username;
});

dpd.competences.put({id : this.competenceId, nbSituations : {$inc: 1}});