const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()

app.use('/', serveStatic(path.join(__dirname, '/dist')))
app.use('/mat-ong', serveStatic(path.join(__dirname, '/dist')))
app.use('/tieu', serveStatic(path.join(__dirname, '/dist')))
app.use('/nghe', serveStatic(path.join(__dirname, '/dist')))
app.use('/nong-san-khac', serveStatic(path.join(__dirname, '/dist')))
app.use('/cacao', serveStatic(path.join(__dirname, '/dist')))

const port = process.env.PORT || 8080

app.listen(port)

console.log('Listening on port: ' + port)
