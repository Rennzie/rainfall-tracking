const express = require('express');
const bodyParser = require('body-parser');
const router = require('./config/router');

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/api', router);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
