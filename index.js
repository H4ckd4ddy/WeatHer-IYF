#!/usr/bin/env node
const programm  = require('commander')
const sqlite3   = require('sqlite3')
const test      = require('./test')
const meteo     = require('./meteo')

programm
    .version('1.0.0')
    .option('-m, --meteo',  'Get Meteo Data')

programm.parse(process.argv)

if(programm.meteo){
    let meteoProcess = new meteo()
}else{
    console.log('Use -m to get current temp')
}