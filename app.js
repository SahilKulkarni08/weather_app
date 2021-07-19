const express= require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
const hostname='0.0.0.0';
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");


    
    
});
app.post("/",function(req,res){
      
      
    const query=req.body.name;
    const apikey="b7840ad6449084c223397587e4222c62"
 
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apikey+"&units=metric";
    https.get(url,function(response){
         console.log(response.statusCode);
         response.on("data",function(data){
             const weatherdata=JSON.parse(data)
             const temp=weatherdata.main.temp;
             const weatherDescription=weatherdata.weather[0].description
             const icon=weatherdata.weather[0].icon
             const imageurl="http://openweathermap.org/img/wn/"+icon +"@2x.png"
             
             res.write("<h1>the temperature in "+ query+" is " + temp + " degrees Celcius</h1>");
             res.write("<h3>weather is currrently " + weatherDescription+ " </h3>");
             res.write("<img src=" + imageurl +">")
             res.send()
         })
    })
})


app.listen(3000,hostname,function(){
    console.log("server is running on port 3000");

})