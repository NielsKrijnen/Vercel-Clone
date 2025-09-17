import http from "node:http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Example App!\n");
})

server.listen(3000, () => {
  console.log("Example app listening on port 3000");
})