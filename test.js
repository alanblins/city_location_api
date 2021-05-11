const { searchByLongLat, searchByLongLatFromMultipleShapes } = require('./searchShapeValue');
const { parsePathObj } = require('./testUtils');

var shapes = [{state:'pa',shape:'15MUE250GC_SIR'}, {state:'sp',shape:'35MUE250GC_SIR'}];

//const longitude = -47.506222;
//const latitude = -22.413208;
const latitude = -22.418208	;
const longitude = -47.534968;


const pathObjs = shapes.map( shape => parsePathObj(shape) );
const pathObj = pathObjs[1];

searchByLongLatFromMultipleShapes(longitude, latitude, pathObjs).then( valueFound => {
    if(valueFound){
        console.log(valueFound.properties);
    }else{
        console.log('not found');
    }
});

searchByLongLat(longitude, latitude, pathObj).then( valueFound => {
    if(valueFound){
        console.log(valueFound.properties);
    }else{
        console.log('not found');
    }
});
