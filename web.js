
bodyParser = require('body-parser'),
helmet = require('helmet'),
ejs = require('ejs');
const cors = require('cors')
const crypto = require('crypto');
const pkg = require('./package.json');

// App constants
const port = process.env.PORT || 5000;
const apiPrefix = '/api';

// Store data in-memory, not suited for production use!
const MongoDB = require('mongodb');
const DBClient = new MongoDB.MongoClient(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const express = require('express');
const app = express();

const db = {}

DBClient.connect().then(() => {
  db.user = DBClient.db('bot').collection('main');
  console.log(`[Web Server] MongoDB Connected`)

});

app.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})

require('./router/main')(app);
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));


function keepAlive(){
    app.listen(port, () => {
      console.log(`[Web Server] Server listening on port ${port}`);
    });
}

module.exports = keepAlive;