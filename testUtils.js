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

module.exports = {
    parsePathObj
}