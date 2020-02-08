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
    amount = req.body.amount;
  request({
    url: `https://apiv2.bitcoinaverage.com/convert/global`,
    headers: {'x-ba-key': 'MGM3Mzg5YTBjZDFmNDllNGFhODhmNzNmODAzZjk1YzI'},
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  }, (error, response, body) => {
    let data = JSON.parse(body),
      price = data.price;
      console.log(price);
      date = data.time;
    res.write(`<p>The date is ${date}</p>`);
    res.write(`<h1>${amount}${crypto} is currently worth ${price}${fiat}</h1>`);
    res.send();
  });
})

app.listen(process.env.PORT || 2020, () => {
  console.log('Server is running on port 2020')
})