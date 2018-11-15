#!/usr/bin/env node
const programm = require('commander')
const fs = require('fs')
const sqlite3 = require('sqlite3')

const test = require('./test')

// SETTINGS
const databaseFile = "WeatHer-IYF.db"
// END SETTINGS

programm
    .version("1.0.0")
    .option('-t, --test', 'exemple')

programm.parse(process.argv)

if(programm.test){
    let exemple = new test()
}