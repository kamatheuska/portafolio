const axios = require('axios')

const darkskyUrl = process.env.DARKSKY_URL,
   geocodeApiKey = process.env.GEOCODE_API_KEY,
      geocodeUrl = process.env.GEOCODE_URL,
        twitchId = process.env.TWITCH_CLIENT_ID


/* 
 * Call to  DarkSky API 
 * 
 * returns: <Promise>
 * 
 * data = {
 *   coords: { lat: <Number>, lng: <Number> },
 *   units: <String>,
 *   exclude: <Array>
 * }
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
 * A call to Googleapis 
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

/* 
 * A call to Twitch.tv 
 * 
 * returns: <Promise>
 * 
 * data = {
 *   address: <String>,
 * }
 * 
 */
const getTwitchUsers = () => {
  let url = 'https://api.twitch.tv/helix/users'
  let config = {
    params: {
      'login': ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
    }, 
    headers: {
      'Client-ID': twitchId

    }
  }
  console.log('TWITCHID: ', twitchId)
  return axios.create().get(url, config)
}
const getTwitchStreams = () => {
  let url = 'https://api.twitch.tv/helix/streams'
  let config = {
    params: {
      first: 10
    }, 
    headers: {
      'Client-ID': twitchId

    }
  }
  console.log('TWITCHID: ', twitchId)
  return axios.create().get(url, config)
}

const getTwitchRecommendedStreams = () => {
  let url = 'https://api.twitch.tv/helix/streams'
  let config = {
    params: {
      'user_login': ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas']
    }, 
    headers: {
      'Client-ID': twitchId

    }
  }
  console.log('TWITCHID: ', twitchId)
  return axios.create().get(url, config)
}

/*
https://api.twitch.tv/helix/streams?
https://api.twitch.tv/helix/users?

freecodecamp, ESL_SC2, OgamingSC2, cretetion, freecodecamp, storbeck, habathcx, RobotCaleb, noobs2ninjas


user_login=freecodecamp&user_login=ESL_SC2&user_login=OgamingSC2&user_login=cretetion&user_login=freecodecamp&user_login=storbeck&user_login=habathcx&user_login=RobotCaleb&user_login=noobs2ninjas

*/
module.exports = { weatherForecast, geocodeString, getTwitchStreams, getTwitchRecommendedStreams, getTwitchUsers }