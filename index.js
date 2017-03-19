const express = require('express')
const app = express()

const morgan = require('morgan')

app.use(morgan('dev'))

app.get('/hello', function handleGetHello(req, res) {
    res.send('<h1> Hello From Docker! </h1>')
})

app.get('/name', function handleGetName(req, res) {
    res.send(`<h1> My name is ${process.env.NAME}</h1>`)
})

app.get('/info', function handleGetInfo(req, res) {
    res.send(JSON.stringify(process.env, null, 2))
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
})