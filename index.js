#!/usr/bin/env node
const programm = require('commander')
const fs = require('fs')
const sqlite3 = require('sqlite3')

const test = require('./test')
const meteo = require('./meteo')

// SETTINGS
const databaseFile = 'WeatHer-IYF.db'
// END SETTINGS

programm
    .version('1.0.0')
    .option('-t, --test', 'exemple')
    .option('-m, --meteo', 'Get Meteo Data')

programm.parse(process.argv)

if(programm.test){
    let exemple = new test()
}else if(programm.meteo){
    let meteo = new meteo()
}else{
    console.log('Help')
}