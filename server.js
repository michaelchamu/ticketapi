var express = require('express');
app = express(),
    mongoose = require('mongoose'),
    Ticket = require('./api/models/ticketsModel'),
    User = require('./api/models/usersModel'),
    jsonwebtoken = require('jsonwebtoken'),
    bodyParser = require('body-parser');
port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
            if (err)
                req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

/*app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});*/

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ticketsDB');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/ticketsRoutes');
routes(app);


app.listen(port);

console.info('API Engine running on port: ' + port);