#!/usr/bin/env node
const programm = require('commander')
const fs = require('fs')
const sqlite3 = require('sqlite3')

// SETTINGS
const databaseFile = "WeatHer-IYF.db"
// END SETTINGS

programm
    .version("1.0.0")
    .option('-i, --initialisation', 'Create the database')
    .option('-l, --list', 'List credentials in database')
    .option('-t, --test', 'This is a test')

programm.parse(process.argv)

