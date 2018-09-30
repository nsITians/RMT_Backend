const express = require('express'),
    bp = require('body-parser'),
    app = express(),
    db = require('./src/db'),
    api = require('./src/routes');

app.use(bp.json());
app.use(bp.urlencoded({extend: true}));


app.use('/api/v1',api.v1);

db.sequelize.sync().then(()=>{
    console.log('database configured');
    app.listen(4000, (req, res) => console.log("Server started on port 4000"));
});