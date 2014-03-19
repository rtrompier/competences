if(query.nbsituations){
    hide("username");
    hide("id");
    dpd.situations.get({}, function(situation) {
        this.nbsituation = situation.length;
    });
}