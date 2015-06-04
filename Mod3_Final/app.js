var fs = require('fs');
var fileName;

try{

	if(process.argv.length < 3){
		console.log('Syntax error:" node append <f1> <f2> .. <fn>" ');
		process.exit();
	}
	
	for( var i = 2; i < process.argv.length ; i++){
		ReadAppendFile(process.argv[i]);
	}	
}
catch(e){
	console.error(e);
}

function ReadAppendFile(fileName)
{
	fs.readFile(fileName,function(err,data){
		if(err){
			console.error(err);
		}
		else{
			fs.appendFile("./final.txt",data,function(err){
				if(err) throw err;
				console.log('The file ' +  fileName + ' was concatenated successfully');
			});
		}	
	});
}