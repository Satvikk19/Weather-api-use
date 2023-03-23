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
    //id is removed from this place as it is api key. Please use your own api over here.
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
