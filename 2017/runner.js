
var file = process.argv[2];

// check input

if (file == null){  
    console.log('no file specified');
    return;
}


function trimExtension(file){
    var index = file.lastIndexOf('.js');
    if (index>0) {
        return file.substr(0, file.lastIndexOf('.js'));
    } else {
        return file;
    }
}

var moduleName = trimExtension(file);


function loadAndEval(moduleName){
    console.log('\033cloading module', moduleName);
    try {
        require(moduleName);
    } catch (exception){
        console.error(exception);
    }
}

const fs = require('fs');

fs.watch(file, { encoding: 'buffer'}, (eventType, filename) => {
   if (filename) {
       console.log(filename);
       delete require.cache[require.resolve(moduleName)];
       loadAndEval(moduleName);
   }
});

// first run
loadAndEval(moduleName);