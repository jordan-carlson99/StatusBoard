
// uses node require method to import http module so it can transfer data over http
const http = require('http');
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 8080;

fs.readFile('\index.html', function (err, html) {
    if (err) {
        throw err
    }
    const server = http.createServer(function (req, res) {
        res.write(html)
        res.end();
      }).listen(port, hostname); 
})

