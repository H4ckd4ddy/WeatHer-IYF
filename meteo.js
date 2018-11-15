const request = require('request');
class meteo {

    constructor(){
        this.weatherStart();
    }

    weatherStart() {

        let apiKey = 'c3ba801c7ef6fc89d70a04ee6c75d80d';
        let city = 'bordeaux';
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        request(url, function (err, response, body) {
            if (err) {
                console.log('error:', error);
            } else {
                console.log('body:', body);
                let weather = JSON.parse(body);
                console.log(weather.name)
            }
        });
    }
}

module.exports = meteo