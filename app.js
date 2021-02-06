// this project is a web api which will send a html file back to the 
// client if recieved right request else it will return a 404 error page.

const http = require('http'); //imported http core module as http .
const fs = require('fs');     // imported fs core module as fs.
const path = require("path"); //imported path core module as path.

//created a server using http module and stored it in this server var.
// this will listen to a specific port for a request and if recieved 
// will send responce accordingly.
const server = http.createServer((req, res) => {
  const exist = isPath(req);
  console.log(exist);
  if (!exist[1]) {
    error404(res);
    return;
  }
  if (exist[1] && req.url != '/') {
    ok(res, exist[0]);
    return;
  }
  if (req.url == '/') {
    ok(res, exist[0])
  }




}).listen(9999); //given a port to listen on . 

console.log('ok listening to port 9999')

function isPath(request) {
  const url = request.url;
  let p = [null];
  if (url == '/') {
    p[0] = path.resolve('serve/ok/user.html');
  } else {
    p[0] = path.resolve(`./${url}`)
  }
  p.push(fs.existsSync(p[0], (is) => { return is }));


  return p;
}

function extinsion(p) {
  if (path.extname(p)=='.js') {
    return 'application/javascript'
  }
  if (path.extname(p)=='.html') {
    return 'text/html'
  } 
  if (path.extname(p)=='.css') {
    return 'text/css';
  }
  return  'text/plain'  
}
//function to send error page.
function error404(response) {
  console.log('error happened....');

  //write header with method 404 and content-type html.
  response.writeHead(404, { 'content-type': "text/html" });

  //created a readStream for error file and piped it to response .
  fs.createReadStream('./serve/error404/index.html').pipe(response);
};

//function to send correct page.
function ok(response, path) {
  console.log('ok got it...');


  //write header with method 200 ok and content-type html.
  response.writeHead(200, { 'content-type': extinsion(path) });

  //created a readStream for error file and piped it to response .
  fs.createReadStream(path).pipe(response);
}