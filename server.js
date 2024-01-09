const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    if (req.url === `/submit-form.js`) {
      let body = ``;
      req.on(`data`, (chunk) => {
        body += chunk;
      });
      req.on(`end`, () => {
        const formData = new URLSearchParams(body);
        const email = formData.get(`email`);
        const name = formData.get(`name`);
        const surname = formData.get(`surname`);
        const message = formData.get(`message`);
      });
    }
  } else {
    let filePath = `.` + req.url;
    if (filePath === `./`) {
      filePath = `index.html`;
    }
    const extname = path.extname(filePath);
    let contentType = `text/hmtl`;
    switch (extname) {
      case `.css`:
        contentType = `text/css`;
        break;
      case `.js`:
        contentType = `application/javascript`;
        break;
    }
    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === `ENNOENT`) {
          res.writeHead(404);
          res.end(`404 fajlli nuk u gjet`);
        } else {
          res.writeHead(500);
          res.end(`500 error i brendshem`);
        }
      } else {
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
      }
    });
  }
});

const port = 8080;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
