'use strict';
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
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
        default: moment()
    },
    status: {
        type: String,
        enum: ['Open', 'Pending', 'Resolved'],
        default: 'Open'
    }
});

module.exports = mongoose.model('Tickets', TicketSchema);