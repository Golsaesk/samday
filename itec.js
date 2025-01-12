const fs = require('fs');
const {createServer} = require('https');
const {parse} = require('url');
const next = require('next');

const HOSTNAME = 'samdai.local';
const PORT = 8414;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev, hostname: HOSTNAME, port: PORT});
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./certificates/site.key"),
  cert: fs.readFileSync("./certificates/site.crt"),
};

app.prepare().then(() => {
  createServer(httpsOptions,(req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, HOSTNAME, (err) => {
    if (err) {
      console.log(JSON.stringify(err, null, 2));
    }
    console.log(`Starting Next.js at https://${HOSTNAME}:${PORT}`);
  });
});
