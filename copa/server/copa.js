Meteor.startup(function () {
  // cada 10 segundos chequeo la api de worldcup y actualizo los partidos
  Meteor.setInterval(function () {
    Meteor.http.get('http://worldcup.sfg.io/matches/today', null, function(err, result) {
      if (!err)
        _.each(result.data, function (value, index) {
          Matches.update({match_number: value.match_number}, {$set: {"status": value.status.replace(' ', '_'), "home_team.goals": value.home_team.goals, "away_team.goals": value.away_team.goals}});
        });
    });
  }, 10000);
});

Meteor.methods({
  'insertComment': function (comment, match_id) {
    check(comment, String);
    check(match_id, String);
    if (comment.length > 0) {
      return Comments.insert({comment: comment, match_id: match_id});
    }
    return false;
  }
});
