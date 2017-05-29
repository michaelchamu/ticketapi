'use strict';
module.exports = function(app) {
    var ticket = require('../controllers/ticketsController'),
        userHandlers = require('../controllers/usersController');

    app.route('/tickets')
        .get(ticket.listTickets) //Read all tickets from the database
        .post(userHandlers.loginRequired, ticket.addTicket); //Post a single ticket

    app.route('/tickets/:id')
        .get(ticket.showTicket) //Read one ticket from the database
        .put(ticket.editTicket) //Update one ticket
        .delete(ticket.removeTicket);

    app.route('/auth/register')
        .post(userHandlers.register);

    app.route('/auth/signin')
        .post(userHandlers.signin);
}