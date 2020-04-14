const express = require("express");
const path = require("path");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "build")));

// Express serve up index.html file if it doesn't recognize route
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 80;
app.listen(port);

console.log("App is listening on port " + port);
