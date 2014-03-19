dpd.users.get({id : me.id}, function(user) {
    this.auth = user.nbsituation;
    if(query.all){
        if(user.nbSituation < 2){
            cancel("not yours", 401);
        }
        dpd.competences.get({id : this.competenceid}, function(competence) {
            this.competence = competence;
        });
    }else if (query.id){
        if (!isMe(this.userid)) {
            if(user.nbSituation < 3){
                cancel("not yours", 401);
            }
        }
        dpd.competences.get({id : this.competenceid}, function(competence) {
            this.competence = competence;
        });
    }else if(query.comp){
        if (!isMe(this.userid)) {
            if(user.nbSituation < 3){
                cancel("not yours", 401);
            }
        }
    }else{
        if (!isMe(this.userid)) {
            cancel("not yours", 401);
        }
        dpd.competences.get({id : this.competenceid}, function(competence) {
            this.competence = competence;
        });
    }
});




