const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3030;

// Require and use routes
const playerRoutes = require('./routes/PlayerRoutes');
const userRoutes = require('./routes/UserRoutes');

app.use('/api/v1/players', playerRoutes);
app.use('/api/v1/users', userRoutes);

app.get('*', (req, res) => res.status(200).send({ message: 'Vanhatie API' }));

app.listen(port, () => {
  console.log(`Vanhatie API is listening on port ${port}`);
});