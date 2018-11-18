const rand      = require("random-key")
const cryptoLib = require('crypto')
const zlib      = require('zlib')
const fs        = require('fs')

class crypto {
    
    constructor(){
        this.generateKey()
        this.encryptFile('/Users/Etienne/Documents/GitHub/WeatHer-IYF/test.txt')
    }
    
    generateKey(){
        this.key = rand.generate(50);
    }
    
    encryptFile(path){
        let r = fs.createReadStream(path)
        let zip = zlib.createGzip()
        let encrypted = cryptoLib.createCipher('aes-256-ctr', this.key)
        let w = fs.createWriteStream('/Users/Etienne/Documents/GitHub/WeatHer-IYF/file.out.txt')
        r.pipe(zip).pipe(encrypted).pipe(w)
    }
    
}

module.exports = crypto