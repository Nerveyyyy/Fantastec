require('dotenv').config();

const PORT = process.env.PORT || 12345;
const HOST = process.env.HOST || '127.0.0.1';

const index = require("./index");

index.listen(PORT, HOST, (err) => {
  if (err) return console.log(err);

  console.log(`Fantastec listening on ${PORT}!`);
});
