require('dotenv').config(); // Get Variables

// Set variables if they dont exist.
const PORT = process.env.PORT || 12345;
const HOST = process.env.HOST || '127.0.0.1';

const index = require("./index"); // Require the actual app.

index.listen(PORT, HOST, (err) => {
  if (err) return console.log(err);

  console.log(`Fantastec listening on ${PORT}!`);
}); // Start the server.
