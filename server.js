const { createServer } = require("https");
const { parse } = require("url");
const path = require('path');
const next = require("next");
const fs = require("fs");
const ip = require('ip');
const hostname = ip.address();
const port = 3000
const dev = true;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const httpsOptions = {
  key: fs.readFileSync("./certificates/localhost.key"),
  cert: fs.readFileSync("./certificates/localhost.crt"),
};

const serveStatic = (req, res) => {
    const parsedUrl = parse(req.url, true);
    const filePath = path.join(process.cwd(), 'public/uploads', parsedUrl.pathname);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            handle(req, res, parsedUrl);
            return;
        }

        const stream = fs.createReadStream(filePath);
        stream.on('error', () => handle(req, res, parsedUrl));
        stream.pipe(res);
    });
};
// app.prepare().then(() => {
//   createServer(httpsOptions, (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   }).listen(3000, (err) => {
//     if (err) throw err;
//     console.log(`> Server started on https://${ip.address()}:3000`);
//   });
// });

app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
        serveStatic(req, res);
    }).listen(3000, '0.0.0.0', (err) => {
        if (err) throw err;
        console.log(`> Ready on https://${ip.address()}:3000`);
    });
});