const request = require('request');
const inquirer = require('inquirer');
const math = require('math');
class meteo {

    constructor() {
        this.weatherStart();
    }

    weatherStart() {
        if (process.argv[3]) {
            if (process.argv[3] == "help") {
                console.log("Vous avez demander de l'aide ?");
            } else {
                let city = process.argv[3];
                this.apiRequest(city);
            }
        } else {
            inquirer.prompt([{
                type: 'input',
                message: 'Entrez la ville voulu',
                name: 'city'
            }

            ]).then((answers) => {
                this.apiRequest(answers.city);
                });
        }
    }

    apiRequest(city) {
        let apiKey = 'c3ba801c7ef6fc89d70a04ee6c75d80d';
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        request(url, function (err, response, body) {
            if (err) {
                console.log('error:', error);
            } else {
                let weather = JSON.parse(body);
                let weatherTemp = math.round(weather.main.temp - 273);
                console.log("Il fais " + weatherTemp + " degres a " + weather.name + ". ");
            }

        })
    }
 
}

module.exports = meteo