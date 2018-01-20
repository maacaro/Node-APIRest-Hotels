const request = require('supertest');
const app = require("../server/app.js");
const data = require('../data/data.json');


it('should response the GET method with status ok', async () => {
    const response = await request(app).get('/');
    
    expect(response.statusCode).toBe(200);
});

it('should response the GET method with the expected type', async () => {
    const response = await request(app).get('/');
    
    expect(response.type).toEqual("application/json");
});

it('should response the GET method the list of Hotels', async () => {
    const response = await request(app).get('/');
    
    expect(response.body).toEqual(data);
});
