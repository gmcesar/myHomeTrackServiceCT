const express = require('express')
const bodyParser = require('body-parser')
const routesAPI = require('./routes/api')
const PORT = process.env.PORT || 5000

express()
  .use(bodyParser.json({}))
  .use('/', routesAPI)
  .use(function(err, req, res, next) {
    console.log(err)
    res.status(400).send({ "error": "Could not decode request: JSON parsing failed" })
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
