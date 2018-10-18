const express = require('express'),
    bp = require('body-parser'),
    log = require('debug')('server:run'),
    app = express(),
    passport = require('passport'),
    db = require('./src/db'),
    api = require('./src/routes');

app.use(bp.json());
app.use(bp.urlencoded({extend: true}));

app.use(passport.initialize());


app.use('/api/v1', api.v1);

db.sequelize.sync({
    logging: false
}).then(() => {
    log('database configured');
    app.listen(4000, () => log("Server started on port 4000"));
});