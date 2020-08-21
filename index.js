var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();






const readline = require('readline');


//          (_    ,_,    _) 
//          / `'--) (--'` \
//         /  _,-'\_/'-,_  \
//        /.-'     "     '-.\
//         Julia Orion Smith

const port = 5101; 
const _K = "MTIzNHx8b3Jpb24="; 


app.use(bodyParser.json())
var fs = require("fs");
var path = require('path');

//console.log("public",__dirname + '/sitio')
app.use('/', express.static(__dirname + '/sitio'));
app.use('/bandeja/', express.static(__dirname + '/bandeja'));
app.use('/ordenes/', express.static(__dirname + '/ordenes'));
app.use('/archivo/', express.static(__dirname + '/archivo'));




//ORDENES

//MENÚ
app.get('/menu', function (req, res) {
	fs.readFile('empresasv1.json', 'utf8', (err, jsonString) => {
		    if (err) {
		        console.log("Error reading file from disk:", err)
		        //res.json({});
		       
		    }
		    try {
		        liveMenu=JSON.parse(jsonString);
		        res.json(this.liveMenu);
		} catch(err) {
		        console.log('Error parsing JSON string:', err)
		        
		    }
		})
	

});




//SITIO PRINCIPAL


app.get('/', function (req, res) {
	
	   res.sendFile(path.join(__dirname + '/sitio/cuestionario.html'));


});





//PUERTO

console.log(`Your port is ${port}`);

app.listen(port, function () {
  console.log('Example app listening on port '+port+'!!!');
});


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}