const axios = require('axios')

const darkskyUrl = process.env.DARKSKY_URL
const geocodeApiKey = process.env.GEOCODE_API_KEY
const geocodeUrl = process.env.GEOCODE_URL

/* 
 * A call to the DarkSky API that takes a 
 * deconstructed data object as an argument.
 * 
 * returns: <Promise>
 * 
 * data = {
 *   coords: { lat: <Number>, lng: <Number> },
 *   units: <String>,
 *   exclude: <Array>
 *
 */

const weatherForecast = ({ coords, units, exclude }) => {

  let url = `${darkskyUrl}${coords.lat},${coords.lng}`
  let config = {
    params: { units, exclude }
  }
  return axios
    .create()
    .get(url, config)
}
/* 
 * A call to Googleapis that takes a 
 * deconstructed data object as an argument.
 * 
 * returns: <Promise>
 * 
 * data = {
 *   address: <String>,
 * }
 * 
 */
const geocodeString = (address) => {
  let config = {
    params: {
      address,
      key: geocodeApiKey
    }
  }
  return axios.create().get(geocodeUrl, config)
}

module.exports = { weatherForecast, geocodeString }