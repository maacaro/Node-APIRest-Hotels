const request = require('supertest');
const app = require("../server/app.js");
const data = require('../data/data.json');


describe('the route /search',()=>{
    it('should response the GET method with status ok', async () => {
        const response = await request(app).get('/search');
        
        expect(response.statusCode).toBe(200);
    });

    it('should response the GET method with the expected type', async () => {
        const response = await request(app).get('/search');
        
        expect(response.type).toEqual("application/json");
    });
    
    it('should response the GET method with the list of Hotels when the stars query is `ALL` and is NOT hotel Name', async () => {
        const response = await request(app).get('/search?stars=ALL,1,4&hotelName=');
        
        expect(response.body).toEqual(data);
    });
    
    it('should response the GET method with the data filter only by hotel name',async()=>{
        const response = await request(app).get('/search?stars=ALL,1,4&hotelName=Stefanos');
        const expectdHotel = [{
            "id": "249942",
            "name": "Hotel Stefanos",
            "stars": 3,
            "price": 994.18,
            "image": "4900059_30_b.jpg",
            "amenities": [
              "safety-box",
              "nightclub",
              "deep-soaking-bathtub",
              "beach",
              "business-center"
            ]
          }];
        
        expect(response.body).toEqual(expectdHotel);
    });
    
    it('should response the GET method with the data filter by stars',async()=>{
        const response = await request(app).get('/search?stars=5');
        
        expect(response.body.every(hotel => hotel.stars ==5)).toEqual(true);
    });
    
    it('should response the GET method with the data filter by name',async()=>{
        const response = await request(app).get('/search?hotelName=Stefanos');
        const expectdHotel = [{
            "id": "249942",
            "name": "Hotel Stefanos",
            "stars": 3,
            "price": 994.18,
            "image": "4900059_30_b.jpg",
            "amenities": [
              "safety-box",
              "nightclub",
              "deep-soaking-bathtub",
              "beach",
              "business-center"
            ]
          }];
        
        expect(response.body).toEqual(expectdHotel);
    });

    it('should response the GET method with the data filter by hotel name and stars',async()=>{
        const response = await request(app).get('/search?stars=3&hotelName=Stos');
        
        expect(response.body.every(hotel => hotel.stars =='3' && hotel.name.includes('S'))).toEqual(true);
    });

});


