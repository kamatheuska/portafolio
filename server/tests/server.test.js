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
describe('POST /api/weather/local', () => {
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

  it('should fail to get the weather forecast', function(done) {
    request(app)
      .post('/api/weather/local')
      .send({
        data: {
          coords: {},
          units: 'si',
          exclude: 'minutely,hourly,daily,alerts,flags'
        }
      })
      .expect(400)
      .end(done)
  })
})

describe('POST /api/weather/other', () => {
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

  it('should fail to get the geocoded address and weather forecast', function(done) {
    request(app)
      .post('/api/weather/local')
      .send({
        data: {
          address: '',
          units: 'si',
          exclude: 'minutely,hourly,daily,alerts,flags'
        }
      })
      .expect(500)
      .end(done)
  })
})

describe('GET /api/quote', () => {
  it('should return a random quote', function(done) {
    request(app)
      .get('/api/quote')
      .expect((res) => {
        console.log(res.body)
        expect(res.body).toBeTruthy()
      })
      .end(done)
  })
})

