class test {
    
    constructor(){
        this.msg = "hello world"
        this.boom()
    }
    
    boom(){
        console.log(this.msg)
    }
    
}

module.exports = test