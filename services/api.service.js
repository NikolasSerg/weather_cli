import axios from "axios";
import { getKeyValue } from "./storage.service.js";
import { weatherConstants } from '../constants/weather.constants.js'
import { printError, printWeather } from "./log.service.js";

const fetchDataWeatherApi = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(weatherConstants.TOKEN)
    if (!token) {
        throw new Error('Not API key, to set using command -t [API_KEY]')
    }
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            units: 'metric'
        }
    })
    return data
}

const getWeather = async (city) => {
    try {
        const weatherData = await fetchDataWeatherApi(city)
        printWeather(weatherData)
    } catch (error) {
        switch (true) {
            case (error.response.status === 404):
                printError('The city is wrong')
                break;
            case (error.response.status === 401):
                printError('The token is wrong')
                break;
            default:
                printError(error.message)
                break;
        }
    }
}

export { getWeather }