const request = require('supertest')
const app = require('../app')

const options = {
  coords: {    
    lat: "41.3823",
    long: "2.1755"
  },
  units: "si",
  exclude: "minutely,hourly,daily,alerts,flags"
} 
describe('GET /api/weather', () => {
  it('should return a JSON response', function(done) {
    request(app)
      .get('/api/weather')
      .send(options)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeTruthy()
        expect(res.body).toBeInstanceOf(Object)
        expect(res.body.latitude).toBe(+(options.coords.lat))
        expect(res.body.longitude).toBe(+(options.coords.long))
      })
      .end(done)
      
  })
})