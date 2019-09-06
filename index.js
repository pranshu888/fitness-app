var express = require('express');
var app = express();


app.use(express.static('public'));


app.listen(process.env.PORT || 3000, function(){
    console.log('Listening on 3000 ');
});

app.get('/',(req,res) => {
    res.sendfile('index.html');
})