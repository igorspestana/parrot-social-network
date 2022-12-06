const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require('express');
const app = express();

const key = fs.readFileSync(path.join(__dirname, 'certs/selfsigned.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certs/selfsigned.crt'));
const options = {
    key: key,
    cert: cert
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/index.html'));
});

const server = https.createServer(options, app)

server.listen(4443, () => {
    console.log('server listen on https://localhost:4443')
});