import express from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello Gift Card!');
});

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});