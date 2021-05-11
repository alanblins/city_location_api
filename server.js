// BASE SETUP
// =============================================================================
// call the packages we need
var gju = require('geojson-utils');
var shapefile = require("shapefile");
var fs = require('fs');
 
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8089;        
var router = express.Router();             

router.use(function(req, res, next) {
    next(); 
});

router.route('/city').get(function(req, res) {
	openShape(req, res,'feature');  
});

router.route('/city/properties').get(function(req, res) {
	searchByLongLatFromMultipleShapes(req.query.longitude, req.query.latitude, pathObjs).then( valueFound => {
		if(valueFound){
			res.json(result.value.properties);
		}else{
			res.json({NM_MUNICIP:'nao encontrado','CD_GEOCMU':0});
		}
	});

});

router.route('/city/geometry').get(function(req, res) {
	openShape(req, res,'geometry');
});

router.route('/city/feature').get(function(req, res) {
	openShape(req, res,'feature');
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);


function openShape(req, res,type){
	var index = 0;
	var shapes = getShapesFilesNames();
	var current_shape = shapes[index];
	readShape(req, res,current_shape,type);
	  
	function readShape(req, res,current_shape,type){
			shapefile.open("malhas_municipais/"+current_shape.state+"/"+current_shape.shape+".shp","malhas_municipais/"+current_shape.state+"/"+current_shape.shape+".dbf",{encoding:'utf8'})
			  .then( 
				function(source){
					return source.read() 
					.then(function log(result) {
					  if (result.done){
										
						index++;
						if(index>shapes.length-1){
							res.json({NM_MUNICIP:'nao encontrado','CD_GEOCMU':0});
							return;
						}else{
							current_shape = shapes[index];
							readShape(req, res,current_shape,type);
							return;
							
						}
						
					  }
					  if(isLocationInCity(req.query.longitude,req.query.latitude,result.value.geometry)){
						var name = result.value.properties.NM_MUNICIP;
						if(type=='properties'){
							res.json(result.value.properties);
						}else if(type=='geometry'){
							res.json(result.value.geometry);
						}else if(type=='feature'){
							res.json(result.value);
						}
						return;
					  }
					  return source.read().then(log);
					})
				})
				.catch(error => console.error(error.stack));
	}
	  
}

function isLocationInCity(longitute,latitude,geometry){
	return gju.pointInPolygon({"type":"Point","coordinates":[longitute,
          latitude]},
                 geometry);
 }

function getShapesFilesNames(){
	return [
		{state:'sp',shape:'35MUE250GC_SIR'},
		{state:'pa',shape:'15MUE250GC_SIR'}
	];
}
function parsePathObj(shape){
    return {
        shapePath: getShpPath(shape),
        dbfPath: getDbfPath(shape)
    }
}

function getDbfPath(shape){
    return "malhas_municipais/"+shape.state+"/"+shape.shape+".dbf";
}

function getShpPath(shape){
    return "malhas_municipais/"+shape.state+"/"+shape.shape+".shp";
}