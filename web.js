
bodyParser = require('body-parser'),
helmet = require('helmet'),
ejs = require('ejs');
const cors = require('cors')
const crypto = require('crypto');

// App constants
const port = process.env.PORT || 3000;

// Store data in-memory, not suited for production use!
const express = require('express');
const app = express();


app.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})

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