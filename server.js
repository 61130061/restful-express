require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const API = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

/*
 *  body-parser described by ExpressJS
 *  https://expressjs.com/en/resources/middleware/body-parser.html
 */
app.use(bodyParser.json());
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
);


// Use API Routes
app.use('/api', API);

// Initialize index request
app.get('/', (req, res) => {
   res.json({ info: 'hello world' });
});


app.listen(PORT, () => {
   console.log(`Server is running on PORT ${PORT}`);
});
