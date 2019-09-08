var express= require("express");
app=express();
bodyParser=require("body-parser");
var http = require('http');
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/disease/find",function(req,res)
{
    res.render("find");
})
app.post("/disease",function(req,res){

    var result=req.body.disease.title;

    console.log(result);
    var options = {
        'method': 'GET',
        'hostname': 'www.healthos.co',
        'path': '/api/v1/search/diseases/'+result.toString()+'',
        'headers': {
          'Authorization': 'Bearer 6a4860b58fd9f53d8ed1bb99ed6157eb70876edc40119e4b106f1236c9aec379'
        }
      };
      var req = http.request(options, function (res) {
        var chunks = [];
      
        res.on("data", function (chunk) {
          chunks.push(chunk);
        });
      
        res.on("end", function (chunk) {
          var body = Buffer.concat(chunks);
          console.log(body.toString());
        });
      
        res.on("error", function (error) {
          console.error(error);
        });
      });
      
      req.end();
        
});
app.listen("3000",function(){
    console.log("server started");
});


