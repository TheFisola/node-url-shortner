const express = require('express');
const actuator = require('express-actuator');
const cors = require('cors');
const routes = require('./routes/v1');
const db = require('./models');

require('dotenv-flow').config();

const app = express();

const PORT = process.env.PORT;

db.sequelize.sync();

app.use(express.json());
app.use(actuator());
app.use(cors());
app.options('*', cors());

app.use('/api/v1', routes);

app.use((req, res, next) => {
  res.status(404).json({ status: false, message: 'Not found' });
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message:
        error.message ||
        'Something went wrong while trying to process your request',
    },
  });
});

module.exports = app.listen(PORT, () =>
  console.log(`App running on port ${PORT}`)
);
