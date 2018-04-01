const express = require('express')
const path = require('path')
const request = require('request-promise-native')
const bodyParser = require('body-parser')

const app = express()

const { darksky } = require('./api')
const dist = path.join(__dirname, '..', 'dist')

app.use(express.static(dist))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(dist + 'index.html')
})

app.get('/api/weather', (req, res) => {
  let { coords, units, exclude } = req.body
  let options = {
    uri: `${darksky.url}${coords.lat},${coords.long}?units=${units}&exclude=${exclude}`
  }

  request(options)
    .then((json) => {
      console.log(json)
      res.status(200).send(JSON.parse(json))
    })
    .catch((err) => {
      res.status(400).send()
    })
})

module.exports = app