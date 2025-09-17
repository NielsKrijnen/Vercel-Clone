import express from "express";
import { Queue } from "bullmq";

const app = express()

const buildQueue = new Queue("builds", {
  connection: {
    host: "redis",
    port: 6379
  }
})

app.get("/server", async (_, res) => {
  res.writeHead(200)
  res.end()
})

app.post("/deploy", async (_, res) => {
  const id = Date.now().toString()
  await buildQueue.add("build", { id })
  res.json({ url: `http://${id}.localhost` })
})

app.listen(8000, () => {
  console.log("API running on http://localhost:8000")
})