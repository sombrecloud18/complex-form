import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router } from './routes.js'

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});