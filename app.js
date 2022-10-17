const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    
    const query=req.body.cityname;
 const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f0cf25e890dbd88c6fbd3a5dbc2b8fe5";
  https.get(url, function (response) {
    

    response.on("data", function (data) {
      const wedata = JSON.parse(data);
      const wedata1 = JSON.stringify(wedata);
      const icon = wedata.weather[0].icon;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        "<h1>the weather condition in "+query+" is : " +
          wedata.weather[0].description +
          "</h1>"
      );
      res.write(
        "<h1>the humidity condition in "+query+" is : " +
          wedata.main.humidity +
          "</h1>"
      );
      res.write("<img src=" + imgUrl + ">");
      res.send();
    });
  });


})





app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
})