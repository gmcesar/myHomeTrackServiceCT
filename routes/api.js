const express = require('express')
const router = express.Router()

router.post('/', function(req, res) {
  var array = req.body
  var payload = array["payload"]

  var arrOut = {
    "response": []
  }

  for (var i = 0; i < payload.length; i++) {
    if ((payload[i]["workflow"] === 'completed') && (payload[i]["type"] === 'htv')) {
      var addrObj = JSON.parse(JSON.stringify(payload[i]["address"], ['buildingNumber', 'street', 'suburb', 'state', 'postcode']))
      var keys = Object.keys(addrObj);
      var result = []
      for (var r in keys) {
        result.push(addrObj[keys[r]] + ' ')
      }
      result = result.join().replace(/,+/g, '')
      arrOut["response"].push({
        "concataddress" : result,
        "type" : "htv",
        "workflow" : "completed"
      })
    }
  }
  res.status(200).send(arrOut)
})

module.exports = router
