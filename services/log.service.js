import chalk from 'chalk'
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
}

const printInfo = (message) => {
    console.log(chalk.bgYellow(' INFO ') + ' ' + message);
}

const printHelp = () => {
    console.log(
        dedent
        `${chalk.bgBlue(' HELP ')}
            without parameters - display weather
            -s [CITY] - for set a city
            -h - for help display
            -t [API_KEY] - for token save
        `)
}

const printWeather = (weatherData) => {
    console.log(
        dedent
        `the weather in city - ${weatherData.name},
         the temperature now - ${weatherData.main.temp},
         the temperature min - ${weatherData.main.temp_min},
         the temperature max - ${weatherData.main.temp_max},
         the humidity - ${weatherData.main.humidity} %
        `)
}

export { printError, printSuccess, printHelp, printInfo, printWeather }