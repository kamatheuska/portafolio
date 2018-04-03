const express = require('express')
const path = require('path')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()

const { darksky } = require('./api')
const dist = path.join(__dirname, '..', 'dist')

app.use(express.static(dist))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 

app.get('/', (req, res) => {
  res.sendFile(dist + 'index.html')
})

app.post('/api/weather', (req, res) => {
  let { coords, units, exclude } = req.body.data
  let apiUrl =`${darksky.url}${coords.lat},${coords.long}`
  let config = {
    params: { units, exclude }
  }

  axios
    .create()
    .get(apiUrl, config)
    .then((json) => {
      console.log('RESPONSE FROM DARKSKY',json.data)
      res.status(200).send(json.data)
    })
    .catch((err) => {
      res.status(400).send()
    })
})

module.exports = app