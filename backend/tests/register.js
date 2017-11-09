const should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

describe('POST a user', () => {
  it('should return a 200 status', (done) => {
    api.post('/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify({
        f_name: 'Freddy',
        l_name: 'Krueger',
        interests: ['murder', 'mayhem', 'sharp objects'],
        photo_url: '',
        email: 'Freddy.Krueger@gmail.com',
        password: 'Krueger',
        santa_id: 0,
      }))
      .expect(200, done);
  });

  it('should return a message about registering', (done) => {
    api.post('/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify({
        f_name: 'Freddy',
        l_name: 'Krueger',
        interests: ['murder', 'mayhem', 'sharp objects'],
        photo_url: '',
        email: 'Freddy.Krueger@gmail.com',
        password: 'Krueger',
        santa_id: 0,
      }))
      .end((err, res) => {
        expect(res.body.result).to.be.a('string');
        done();
      });
  });
});
