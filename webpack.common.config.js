const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { createConfig } = require('@openedx/frontend-build');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = createConfig('webpack-prod');
