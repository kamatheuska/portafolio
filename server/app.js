const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const movieQuotes = require('movie-quotes')

const { weatherForecast, geocodeString } = require('./api')
const dist = path.join(__dirname, '..', 'dist')

app.use(express.static(dist))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.sendFile(dist + 'index.html')
})

app.post('/api/weather/local', (req, res) => {
  weatherForecast(req.body.data)
    .then((json) => {
      res.status(200).send(json.data)
    })
    .catch((err) => {
      res.status(400).send()
    })
})

app.post('/api/weather/other', (req, res) => {
  let data = req.body.data
  geocodeString(data.address)
    .then((json) => {
      let obj = {
        coords: {
          lat: json.data.results[0].geometry.location.lat,
          lng: json.data.results[0].geometry.location.lng
        },
        units: data.units,
        exclude: data.exclude
      }
      return weatherForecast(obj)
    })
    .then((json) => {
      res.status(200).send(json.data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

app.get('/api/quote', (req, res) => {
  let fullQuote = movieQuotes.random()
  let endOfQuote = fullQuote.indexOf('"', 1) + 1
  let obj = {
    quote: fullQuote.slice(0, endOfQuote),
    author: fullQuote.slice(endOfQuote + 1)
  }
  console.log(obj)
  res.json(obj)
})
module.exports = app