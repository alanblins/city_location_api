var outDir = 'malhas_municipais';
var unzip = require('unzip');
var Client = require('ftp');
var fs = require('fs');
var estados = [
  'PA',
  'SP',  
];
  
var municipioDownloads  = [];

var done=0;
  
for(var index in estados){
    var estado = estados[index];
	municipioDownloads.push(new MunicipioDownload(new Client(),estado));
}
  
for(var index in municipioDownloads){
	municipioDownloads[index].connect();
}


function MunicipioDownload(c,estado){
	var filename = estado.toLowerCase()+"_municipios.zip";
    console.log(filename);
	c.on('end', function() {
		var streamZip = fs.createReadStream(filename);
		streamZip.once('end', function() { 
			fs.unlinkSync(filename);
	    });
	  
	    streamZip.pipe(unzip.Extract({ path: outDir+'/'+estado.toLowerCase()}));
		done++;
	    if(done == estados.length){
  		  console.log('ALL DONE');
	    }
	});
	
	
	c.on('ready', function() {
	c.get('/organizacao_do_territorio/malhas_territoriais/malhas_municipais/municipio_2015/UFs/'+estado+'/'+filename, function(err, stream) {
	  if (err) throw err;
	  stream.once('close', function() { 
		c.end(); 
	  });
	  stream.pipe(fs.createWriteStream(filename));
	  
	  
	});
	});
	// connect to localhost:21 as anonymous

	this.connect = function(){
		c.connect({host: 'geoftp.ibge.gov.br'});
	}
}



