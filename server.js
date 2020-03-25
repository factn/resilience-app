const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

const port = process.env.PORT || 80;
app.listen(port);

console.log('App is listening on port ' + port);
