'use strict';
var mongoose = require('mongoose'),
    Ticket = mongoose.model('Tickets');

exports.listTickets = function(req, res) {
    Ticket.find({}, function(err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};

exports.addTicket = function(req, res) {
    var newTicket = new Ticket(req.body);
    newTicket.save(function(err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};

exports.showTicket = function(req, res) {
    Ticket.findById(req.params.ticketId, function(err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};

exports.editTicket = function(req, res) {
    Ticket.findOneAndUpdate(req.params.ticketId, req.body, { new: true }, function(err, ticket) {
        if (err)
            res.send(err);
        res.json(ticket);
    });
};

exports.removeTicket = function(req, res) {
    Ticket.remove({
        _id: req.params.taskId
    }, function(err, ticket) {
        if (err)
            res.send(err);
        res.json({ message: 'Ticket deleted' });
    });
};