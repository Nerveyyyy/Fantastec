const express = require('express');
const router = express.Router();
const features = require("../features.json");

router.get('/features', function(req, res) {
  if (!req.body || !req.body.email || !req.body.location) return invalidExpression(res);

  console.log(req.body);

  return res.status(200).json({success: true, body: "allowedFeatures"})
});

function invalidExpression(res) {
  res.status(500).json({success: true, body: "Invalid Body Format."})
}

module.exports = router;
