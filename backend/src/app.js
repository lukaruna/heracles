const express = require('express');
const Joi = require('joi')
const bodyParser = require('body-parser');
const validator = require('express-joi-validation').createValidator({})
const R = require("ramda")

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

const objectValidator = Joi.object({
  value: Joi.number().min(0).required()
})

app.post('/formatMoney', validator.body(objectValidator), (req, res) => {

  const value = parseFloat(req.body.value)
  const integerPart = Math.floor(value)

  /*

    fractionPart example: value = 3.21
      ~ first line applies transformation to 0.21
      ~ second line applies transformation to '0.21'
      ~ third line applies transformation to '.21'

  */
  const fractionPart = (value - integerPart).toFixed(2)
      .toString()
      .substring(1)

  /* reverseAndSpaceInteger example: integerPart = '3000'
      1. Reverts string ('0003')
      2. Adds space every 3 characters ('000 3')
      3. Trim if needed (there may be spaces)
  */

  const reversedAndSpacedIntegerPart = R
      .reverse(integerPart.toString())
      .replace(/(.{3})/g, '$1 ')
      .trim()

  const treatedIntegerPart = R.reverse(reversedAndSpacedIntegerPart)

  //Reverted it back, now concatenate and return!

  return res
      .status(200)
      .send({value: `${treatedIntegerPart}${fractionPart}`})
});

module.exports = {app};