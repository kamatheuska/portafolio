const request = require('supertest')
const app = require('../app.js')

const localOpts = {
  data: {
    coords: {    
      lat: '41.3823',
      lng: '2.1755'
    },
    units: 'si',
    exclude: 'minutely,hourly,daily,alerts,flags'
  }
} 
const otherOpts = {
  data: {
    address: '234 W 42nd St, New York, NY 10036, USA',
    units: 'si',
    exclude: 'minutely,hourly,daily,alerts,flags'
  }
} 
describe('GET /api/weather/local', () => {
  it('should return a JSON response', function(done) {
    request(app)
      .post('/api/weather/local')
      .send(localOpts)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeTruthy()
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.latitude).toBe(+(localOpts.data.coords.lat))
        expect(res.body.longitude).toBe(+(localOpts.data.coords.lng))
      })
      .end(done)
      
  })
})

describe('GET /api/weather/other', () => {
  it('should return a JSON response from GoogleApis', function(done) {
    request(app)
      .post('/api/weather/other')
      .send(otherOpts)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeTruthy()
        expect(res.body).toBeInstanceOf(Object)
      })
      .end(done)
      
  })
})