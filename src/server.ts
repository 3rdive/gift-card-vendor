import express from 'express';
import dbSetup from './Config/db/db-setup';
// import router from './Routes';
import authRouter from './Routes/index';
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json())

dbSetup()


const port = process.env.PORT;

//Routes

app.use('/', authRouter)

app.get('/api/v1', (req, res) => {
  res.send('Hello Gift Card!');
});

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});