/** configuracion de moment, labels de match y helpers */
moment.lang('es');
match_status = {
  'completed': 'Finalizado',
  'future': 'Proximo a jugar',
  'in_progress': 'Jugandose'
};
Handlebars.registerHelper('formatDate', function (date) {
  return moment(date).format("DD/MM/YYYY HH:mm")
});

Handlebars.registerHelper('formatStatus', function (status) {
  return match_status[status];
});
/** fin de config **/

/** begin menu **/
Template.menu.helpers({
  'allMatches': function () {
    return Matches.find({}, {sort: {'datetime': -1}});
  }
});

Template.menu.events({
  'click .list-group-item': function (e) {
    e.preventDefault();
    $('#comment').val('');
    Session.set('currentMatch', this._id);
  }
});
/** end menu **/

/** begin content **/
Template.content.helpers({
  'currentMatch': function () {
    return Matches.findOne(Session.get('currentMatch'));
  },
  'allComments': function () {
    return Comments.find({match_id: Session.get('currentMatch')});
  }
});

Template.content.events({
  'click #enviar': function (e, t) {
    insertComment(t);
  },
  'keypress #comment': function (e, t) {
    if (e.which === 13) {
      insertComment(t);
    }
  }
});

function insertComment(t) {
  Meteor.call('insertComment', t.findAll('#comment')[0].value, Session.get('currentMatch'));
  t.findAll('#comment')[0].value = '';
};
/** end content **/