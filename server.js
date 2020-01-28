let express = require('express');
let path = require('path');
let history = require('connect-history-api-fallback');
let serveStatic = require('serve-static');

app = express();

// Use a fallback for non-root routes (required for Vue router)
//   NOTE: History fallback must be "used" before the static serving middleware!
app.use(history({
    // OPTIONAL: Includes more verbose logging
    verbose: true
}))

// Serve static assets from the build files (images, etc)
app.use(serveStatic(path.join(__dirname, '/dist')));

let port = process.env.PORT || 5000;

app.listen(port);
console.log('server started ' + port);
