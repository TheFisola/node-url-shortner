const express = require('express');
const actuator = require('express-actuator');
const httpStatus = require('http-status');
const cors = require('cors');
const routes = require('./routes/v1');

const app = express();

// TODO: Move to .env
app.listen('3000', () => console.log('App running on port 3000'))

app.use(express.json());
app.use(actuator());
app.use(cors());
app.options('*', cors());

app.use('/api/v1', routes);


app.use((req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({ status: false, message: 'Not found' });
});