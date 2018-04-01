const express = require('express')
const path = require('path')

const geocode = {
  apikey: 'AIzaSyBWFMA4IrTCo8Q3EccdYOStUPSEmp0idQQ',
  url: 'http://maps.googleapis.com/maps/api/geocode/json'
}
const darksky = {
  url: `https://api.darksky.net/forecast/77a024f82675b4ea73fd4b5484b4efcc/`
}
const app = express()
const port = process.env.PORT || 5000
const dist = path.join(__dirname, '..', 'dist')

app.use(express.static(dist))

app.get('/', (req, res) => {
  res.sendFile(dist + 'index.html')
})

app.get('/api', (req, res) => {
   
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})