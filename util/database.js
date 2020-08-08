const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        'URL by you mongoDB cluster',
        { useUnifiedTopology: true }
    )
        .then(client => {
            console.log('Connected to mongodb!!');
            _db = client.db();
            callback();
        })
        .catch(err => console.log('Error in database : ' + err));
};


const getDb = () => {
    if(_db){
        return _db;
    }
    throw 'No database found!!';
};


module.exports = {
    mongoConnect : mongoConnect,
    getDb : getDb
};