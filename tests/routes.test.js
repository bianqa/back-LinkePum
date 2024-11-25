    const request = require('supertest');
    const app = require('../app');

    describe('GET /', () => {
    it('should respond with a welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Welcome to Express!' });
    });
    });