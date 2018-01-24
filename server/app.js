const express = require('express')
const app = express();
const data = require('../data/data.json');


app.get('/search', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const stars = req.query.stars && req.query.stars.split(',') || [];

    if((!req.query.hotelName && stars.some(item => item ==='ALL'))){
        return  res.status(200).type('application/json').json(data)
    }
            
    if(req.query.hotelName && stars.length > 0 && stars.every(item => item !=='ALL')){
        return  res.status(200).type('application/json')
        .json(data
            .filter(hotel => (hotel.name.toUpperCase().includes(req.query.hotelName.toUpperCase()) && stars.includes(hotel.stars.toString()))));
        }    
        
    if(req.query.hotelName){
        return res.status(200).type('application/json').json(data.filter(hotel => hotel.name.toUpperCase().includes(req.query.hotelName.toUpperCase())));
    }
    if(stars.length > 0){
        return  res.status(200).type('application/json').json(data.filter(hotel => stars.includes(hotel.stars.toString()))); 
    }
    
    return res.status(200).type('application/json').json([]);
 
});

module.exports = app;
