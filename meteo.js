const request = require('request');
const inquirer = require('inquirer');
class meteo {

    constructor() {
        this.weatherStart();
    }

    weatherStart() {

        inquirer.prompt([
            {
                type: 'input',
                message: 'Entrez la ville voulu',
                name: 'city'
            }
        ]).then((answers) => {
            let apiKey = 'c3ba801c7ef6fc89d70a04ee6c75d80d';
            let city = answers.city;
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            request(url, function (err, response, body) {
                if (err) {
                    console.log('error:', error);
                } else {
                    let weather = JSON.parse(body);
                    console.log(weather)
                }
            });
        })
    }
}

module.exports = meteo