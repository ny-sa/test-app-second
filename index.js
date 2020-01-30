const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
  request('https://apiv2.bitcoinaverage.com/indices/global/ticker/BTDUSD', (error, response, body) => {
    let price = JSON.parse(body);
    console.log(price);
  });

})

app.listen(2020, () => {
  console.log('Server is running on port 2020')
})