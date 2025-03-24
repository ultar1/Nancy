const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Add correct content type headers
app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    } else if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    } else if (req.url.endsWith('.jpeg') || req.url.endsWith('.jpg')) {
        res.setHeader('Content-Type', 'image/jpeg');
    }
    next();
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Serving files from:', __dirname);
});
