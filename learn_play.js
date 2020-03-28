// const fs = require('fs');
// fs.writeFileSync('input.txt', 'Hello Vaibhav!\nIf you are reading this it means you have successfully learnt how to create and write into a file.');
// //You can also create html, css and many more files here easily using above command.







// //setTimeout
// setTimeout(()=>{
//     console.log('This is executed after 2 seconds.');
//     fetchData(text => {
//         console.log(text);
//     });
// },2000);

// const fetchData = (callback) => {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() =>{
//             resolve('Done!');
//         },1500);
//     });
//     setTimeout(() =>{
//         callback('This is inside the timeout.This is executed after 3.5 seconds.');
//     },1500);
//     return promise;
// };

// console.log("Line 1");
// console.log("Line 2");

// console.log('Try harder!.... ITs not sufficient');




















const http = require('http');

// const routes = require('./routes');

// const server = http.createServer(routes.handler);
const server = http.createServer();
console.log(routes.text);

server.listen(3000);


















// const http = require('http');

// const server = http.createServer((req, res) => {
//   const url = req.url;
//   if (url === '/') {
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>Assignment 1</title></head>');
//     res.write(
//       '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
//     );
//     res.write('</html>');
//     return res.end();
//   }
//   if (url === '/users') {
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<html>');
//     res.write('<head><title>Assignment 1</title></head>');
//     res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
//     res.write('</html>');
//     return res.end();
//   }
//   // Send a HTML response with some "Page not found text
//   if (url === '/create-user') {
//     const body = [];
//     req.on('data', chunk => {
//       body.push(chunk);
//     });
//     req.on('end', () => {
//       const parsedBody = Buffer.concat(body).toString();
//       console.log(parsedBody.split('=')[1]); // username=whatever-the-user-entered
//     });
//     res.statusCode = 302;
//     res.setHeader('Location', '/');
//     res.end();
//   }
// });

// server.listen(3000);
