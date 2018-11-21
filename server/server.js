const express = require('express');
const app = express();
const path = require('path');
const createRouter = require('./helpers/create_router.js');
const parser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());
//
// MongoClient.connect('mongodb://localhost:27017')
//   .then((client) => {
//     const db = client.db('casino');
//     const sightingsCollection = db.collection('black_jack');
//     const blackJackRouter = createRouter(sightingsCollection);
//     app.use('/api/blackJackRouter', blackJackRouter);
//   })
//   .catch(console.err);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
