const fs = require('fs');

const requestHandler = (req, res) => {
    // console.log(req.url, req.method, req.headers);        // process.exit();
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html><head><title>Form Submission</title></head>');
        res.write('<body><form action = "/message" method="POST"><input type="text" name="message">');
        res.write('<button type="submit">Send</button></form></body></html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk)=>{    // console.log(chunk);
            body.push(chunk);
        })
        return req.on('end', ()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err)=>{
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><head><title>Test number 1</title><head><body>Welcome to the world of Node.js!</body></html>');
    res.end();
}

module.exports = {
    handler : requestHandler  
}