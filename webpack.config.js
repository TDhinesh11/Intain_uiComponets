const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        library: {
            type: 'commonjs2'
        },
        globalObject: 'this'
    },
    externals: {
        'react': 'react',
        'react-dom': 'react-dom',
        '@emotion/react': '@emotion/react',
        '@emotion/styled': '@emotion/styled',
        '@mui/material': '@mui/material',
        '@mui/icons-material': '@mui/icons-material',
        'antd': 'antd',
        'bootstrap': 'bootstrap',
        'react-router-dom': 'react-router-dom',
        'react-window': 'react-window'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
                type: 'asset/inline',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}