const express = require('express')
const app = express()

const port = 3001

const { createProxyMiddleware } = require('http-proxy-middleware')

const options = {
  target: 'https://api.github.com', // target host with the same base path
  pathRewrite: function (path, req) { return path.replace('/proxy', '') },
  changeOrigin: true // needed for virtual hosted sites
}

// create the proxy
const proxy = createProxyMiddleware(options)

// mount `proxy` in web server
app.use('/proxy', proxy)

app.get('/', (req, res) => {
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
