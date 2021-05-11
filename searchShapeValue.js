var shapefile = require("shapefile");
var gju = require('geojson-utils');

function listAllShapeValues(shpPath, dbfPath){
	return shapefile.open(shpPath, dbfPath, {encoding:'utf8'})
	.then( 
	  function(source){
          const values = [];
		  return source.read() 
		  .then(function log(result) {
            if (result.done) {
                return values;
            }else{
                values.push(result.value);
                return source.read().then(log);
            }
		  })
	  })
	  .catch(error => console.error(error.stack));
}

function searchByLongLat(longitude, latitude, pathObj){
    const shapePath = pathObj.shapePath;
    const dbfPath = pathObj.dbfPath;
    return shapefile.open(shapePath, dbfPath, {encoding:'utf8'})
	.then( 
	  function(source){
		  return source.read() 
		  .then(function log(result) {
            if (result.done) {
                return null;
            }else{
                if(isLocationInCity(longitude, latitude, result.value.geometry) ){
                    return result.value;
                }else{
                    return source.read().then(log);
                }
            }
		  })
	  })
	  .catch(error => console.error(error.stack));
}

function searchByLongLatFromMultipleShapes(longitude, latitude, pathObjs){
    if(pathObjs.length>0){
        return searchByLongLat(longitude, latitude, pathObjs.shift()).then( value => {
            if(value){
                return value;
            }
            if(!value && pathObjs.length==0){
                return null;
            }
            if(!value && pathObjs.length>0){
                return searchByLongLat(longitude, latitude, pathObjs.shift());
            }
        } )
    }else{
        return null;
    }
    
}

function isLocationInCity(longitute,latitude,geometry){
	return gju.pointInPolygon({"type":"Point","coordinates":[longitute,
          latitude]},
                 geometry);
 }

 module.exports = {
    listAllShapeValues,
    searchByLongLat,
    searchByLongLatFromMultipleShapes
 };