const express = require('express');

const app = express();

// use static files in the following directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));


const port = process.env.API_PORT || 3000;
app.listen(port, () => {
  console.log(`api running on port ${port}`);
})
