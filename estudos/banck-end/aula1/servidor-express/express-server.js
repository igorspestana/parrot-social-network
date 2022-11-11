/* =========================== */
/* servidor criado com express */
/* =========================== */

const express = require('express')
const app = express()

app.get('/', function (req, res) {
	console.log(req.headers)
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('server listen on http://localhost:3000')
});

/* ======================= */
/* Servidor criado com express */
/* ======================= */

/* const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    console.log(req.headers)
    console.log(path.join(__dirname, 'static', 'index.html'))
    const content = fs.readFileSync(path.join(__dirname, 'static', 'index.html'), 'utf-8')
    res.send(content)
})

app.listen(3000) */

/* ======================= */
/* Servidor criado com express */
/* ======================= */

/* const path = require('path');
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
    res.sendFile(path.join(__dirname, 'static/index.html'));
});

const server = https.createServer(options, app)

server.listen(4443, () => {
    console.log('server listen on https://localhost:4443')
}); */