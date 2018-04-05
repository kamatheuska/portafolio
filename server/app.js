const express = require('express')
const path = require('path')
const axios = require('axios')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()

const { darksky, geocode } = require('./api')
const dist = path.join(__dirname, '..', 'dist')

app.use(express.static(dist))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true })) 
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.sendFile(dist + 'index.html')
})

app.post('/api/weather/local', (req, res) => {
  let { coords, units, exclude } = req.body.data
  let apiUrl =`${darksky.url}${coords.lat},${coords.lng}`
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

app.post('/api/weather/other', (req, res) => {
  let { address, units, exclude  } = req.body.data
  let googleUrl = `${ geocode.url }`;
  let configGeocode = {
    params: {
      address,
      key: geocode.apikey
    }
  }

  let requestWeather = (coords) => {
    let darkSkyUrl =`${darksky.url}${coords.lat},${coords.lng}`
    let configWeather = {
      params: { units, exclude }
    }
    return axios
      .create()
      .get(darkSkyUrl, configWeather)
      .then((json) => {
        return json
      })
      .catch((err) => {
        console.log('Error on weather request', err)
      })
  } 

  axios
    .create()
    .get(googleUrl, configGeocode)
    .then((json) => {
      return requestWeather(json.data.results[0].geometry.location)
    })
    .then((json) => {
      res.status(200).send(json.data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })


})
module.exports = app