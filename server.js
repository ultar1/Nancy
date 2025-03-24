const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 10000;

// Ensure we're serving from the correct directory
const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);

// Serve static files from the public directory
app.use(express.static(publicPath));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something broke!');
});

// Serve index.html for all routes with error handling
app.get('*', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    console.log('Attempting to serve:', indexPath);
    
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(404).send('File not found');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Current directory:', __dirname);
});
