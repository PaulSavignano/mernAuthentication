const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// use static files in the following directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);


// start server
const port = process.env.API_PORT || 3000;
app.listen(port, () => {
  console.log(`api running on port ${port}`);
})
