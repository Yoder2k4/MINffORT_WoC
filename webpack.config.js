const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        vendor: './src/vendor.js'
    },
    output: {
        path:path.resolve(__dirname, 'dist' ),
        filename: '[name].bundle.js'
    },
    watch: true
}