const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        vendor: './src/vendor.js',
        vendor_login: './src/vendor_login.js',
        customer: './src/home_page.js',
        commentSystem: './src/comment_system.js'
    },
    output: {
        path:path.resolve(__dirname, 'dist' ),
        filename: '[name].bundle.js'
    },
    watch: true
}