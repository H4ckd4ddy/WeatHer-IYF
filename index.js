#!/usr/bin/env node
const programm  = require('commander')
const sqlite3   = require('sqlite3')

const test      = require('./test')
const meteo     = require('./meteo')
const crypto    = require('./crypto')

programm
    .version('1.0.0')
    .option('-t, --test',   'exemple')
    .option('-m, --meteo',  'Get Meteo Data')
    .option('-c, --crypto',  'Crypto')

programm.parse(process.argv)

if (programm.test) {
    let exemple = new test()
} else if (programm.meteo) {
    let meteoProcess = new meteo()
}else if(programm.crypto){
    let encryptor = new crypto()
}else{
    console.log('Help')
}