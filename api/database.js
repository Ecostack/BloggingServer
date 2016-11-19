const mongoose = require('mongoose');
const bluebird = require('bluebird');
bluebird.promisifyAll(mongoose);
mongoose.connect('mongodb://mongo/bloggingTest');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Connected to database!');
});