const path = require('path');

module.exports = {
    entry: './src/weakaura.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'weakaura.bundle.js',
    },
};