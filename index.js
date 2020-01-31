const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
  let crypto = req.body.crypto,
    fiat = req.body.fiat;
  request({
    url: `https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto}${fiat}`,
    headers: {'x-ba-key': 'MGM3Mzg5YTBjZDFmNDllNGFhODhmNzNmODAzZjk1YzI'}
  }, (error, response, body) => {
    let data = JSON.parse(body),
      price = data.averages.week,
      date = data.display_timestamp;
    res.write(`<p>The date is ${date}</p>`);
    res.write(`<h1>The price of ${crypto} is ${price}${fiat}</h1>`);
    res.send();
  });
})

app.listen(2020, () => {
  console.log('Server is running on port 2020')
})