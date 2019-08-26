const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.all('/', (req, res, next) => {
  res.end("Hello world");
  next()
})

app.all('/codes/:code(\\d+)', (req, res, next) => {
  res.statusCode = req.params.code
  res.send(`This is a response with status code ${req.params.code}\n`);
  next()
})

app.use((req, res, next) => {
  let now = new Date()
  console.log(JSON.stringify({
    date: now.toGMTString(),
    method: req.method,
    url: req.originalUrl,
    status_code: res.statusCode
  }))
  next()
})

app.listen(port, () => console.log(`Listening on port ${port}`))