const express = require("express");
const app = express();
const https = require("https");
const bodyParser= require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname+ "/index.html");
    
    })
app.post("/", function(req,res){
    console.log(req.body.cityName);
    const query= req.body.cityName;
    const id= "832d806d14da58ae3f28f5f3610c6dc5";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+id+"&units=metric"
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp= weatherData.main.temp;
            const description = weatherData.weather[0].description;
            console.log(description);
            const icon= "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+ "@2x.png";
            res.write('<h1>The weather today is ' + description + ' </h1>');
            res.write('<p>The temprature today is '+temp+'</p>');
            res.write('<img src='+ icon +'>');
            res.send();
        })
        })
})


  







app.listen(3000, function(){
    console.log("Server is running at port 3000");
})