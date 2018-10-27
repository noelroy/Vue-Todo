const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors());

app.use('/api/posts/',require('./routes/api/post'));

const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Server started in ${port}`)})