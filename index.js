var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
var Crawler = require("crawler");
var async = require("async");
var pdf = require('html-pdf');
const multer = require('multer');
const csv = require('fast-csv');
_ = require('underscore');
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
var menuManager = require('./menuManager');
var printingSystem = require('./printingSystem');
//console.log("public",__dirname + '/sitio')
app.use('/', express.static(__dirname + '/sitio'));
app.use('/bandeja/', express.static(__dirname + '/bandeja'));
app.use('/ordenes/', express.static(__dirname + '/ordenes'));
app.use('/archivo/', express.static(__dirname + '/archivo'));


menuManager.inicializa();

//ORDENES

//MENÚ
app.get('/menu', function (req, res) {
	if( 1==0){//!isEmpty(menuManager.liveMenu) ){
		//console.log("live");
		res.json(menuManager.liveMenu);
	}
	else{
		menuManager.menu(function(menuR){
			menuManager.updateCache(menuR);
			res.json(menuR);
			console.log("initializing...");
		});
	}
	

});




//SITIO PRINCIPAL


app.get('/', function (req, res) {
	menudir="./menu/mainmenu.csv";
	if (!fs.existsSync(menudir)){
	   res.sendFile(path.join(__dirname + '/sitio/splash.html'));
	}
	else{
	   res.sendFile(path.join(__dirname + '/sitio/cuestionario.html'));
	}	

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