import supertest from 'supertest';
import app from '../index';

const req = supertest(app);
describe('checks endpoints from main index file', function () {
  it('should return status code 302', function (done) {
    supertest(app)
      .get('/')
      .expect(302)
      .end(function (err, res) {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });
});
