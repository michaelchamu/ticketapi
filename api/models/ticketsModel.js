'use strict';
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var ticketSchema = new Schema({
    title: {
        type: String,
        Required: 'Please provide title for issue to be resolved'
    },
    description: {
        type: String,
        Required: 'Provide details of issue to be tracked'
    },
    date_created: {
        type: Date,
        default: moment.now()
    },
    status: {
        type: String,
        enum: ['Open', 'Pending', 'Resolved'],
        default: 'Open'
    }
});

modules.exports = mongoose.model('Tickets', TicketSchema);