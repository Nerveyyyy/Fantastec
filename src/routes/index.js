const express = require('express');
const router = express.Router();
const features = require("../features.json"); // Due to hardcoded JSON makes it easier to manage

router.get('/features', function(req, res) {
  if (!req.body || !req.body.email || !req.body.location) return invalidExpression(res); // Simple check for fields
  let allowedFeatures = [];
  let UserData = req.body;

  features.map((data) => { // Goes through all features in array.
    if (data.enabledEmails.includes(UserData.email)) return allowedFeatures.push(data.name); // Adds the name of the feature to allowed list.
    if (data.excludedCountries.includes(UserData.location)) return;
    if (!data.includedCountries.includes(UserData.location)) return; // Isn't included.

    let percentage = Math.floor(Math.random() * 99) / 100; // Gets random % 0 - 0.99
    if (percentage < data.ratio) return allowedFeatures.push(data.name); // Calculates if it should be allowed or not then adds to allowed list.

    // List of if statements in order to make sure only the correct data is shown
  });

  return res.status(200).json({success: true, body: allowedFeatures}); // Returns the allowed features
});

function invalidExpression(res) {
  res.status(500).json({success: true, body: "Invalid Body Format."}); // In case the format was incorrect.
}

module.exports = router;
