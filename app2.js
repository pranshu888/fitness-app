var http = require('http');
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/medicine");
var medschema=new mongoose.Schema({
  name:String,
  form: String,
  standardUnits:Number,
  packageForm:String,
  price: Number,
  size: String,
  manufacturer:String,
  constituents: [
      {
          name: String,
          strength: String
      }
  ],
  schedule: {
      category:String,
      label:  String
  },
  medicine_id: String
});
var medicine=mongoose.model("medicine",medschema);
for(var i=1;i<=100;i++)
{
  console.log(i);
  var options = {
    'method': 'GET',
    'hostname': 'www.healthos.co',
    'path': 'http://www.healthos.co/api/v1/medicines/brands?page=i&size=20',
    'headers': {
      'Authorization': 'Bearer f2dbb954acde078d6bbf9a88b4cd5624a9cab3c142dbc032e3562e15bd93a0e3'
    }
  };

/*var options = {
  'method': 'GET',
  'hostname': 'www.healthos.co',
  'path': 'http://www.healthos.co/api/v1/medicines/brands?page=i&size=10',
  'headers': {
    'Authorization': 'Bearer f2dbb954acde078d6bbf9a88b4cd5624a9cab3c142dbc032e3562e15bd93a0e3'
  }
};*/
var count=0;
var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
 
  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    var results=JSON.parse(body);
    results.forEach(function(med){
      
      medicine.create(med,function(err,medicines)
      {
        count=count+1;
        console.log(count);
        if(err)
          console.log("error");
        else
          console.log(medicines);
      });   
    });
  //  console.log(results[0]["name"]);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
console.log(count);
}