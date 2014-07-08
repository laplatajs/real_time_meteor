if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Matches.find().count() === 0) {
      Meteor.http.get('http://worldcup.sfg.io/matches', null, function(err, result) {
        if (!err) {
          _.each(result.data, function(value, index) {
            if (value.home_team.country !== 'To Be Determined') {
                var record = {
                'match_number': value.match_number,
                'datetime': moment(value.datetime).format(),
                'location': value.location,
                'status': value.status.replace(' ', '_'),
                'home_team': {'country': value.home_team.country, 'goals': value.home_team.goals},
                'away_team': {'country': value.away_team.country, 'goals': value.away_team.goals},
              };
              
              Matches.insert(record);
            }
          });
        }
      });
    }
  });
}