const sharp = require('sharp');
let path = require('path'), fs=require('fs');

// Digite as opções Aqui
let ImageHeight = 0;
let ImageWidth = 0;

function fromDir(startPath,filter,callback){

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter,callback);
        }
        else if (filter.test(filename)) callback(filename);
    };
};

// (mude png para a extensão da sua imagem)
fromDir('Folders',/\.png$/,function(filename){

    let file = __dirname + "\\" + filename;

    sharp("" + file.split("\\").join("/"))
    .resize(ImageHeight, ImageWidth)
    .toBuffer()
    .then( data => {
        fs.writeFileSync("" + file.split("\\").join("/"), data);
    })
    .catch( err => {
        console.log(err);
    });		
});