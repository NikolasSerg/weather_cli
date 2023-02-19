import { getKeyValue } from "../services/storage.service.js"
import { printInfo, printError } from "../services/log.service.js"
import { getWeather } from "../services/api.service.js"
import lodash from "lodash"

const checker = async (data) => {
    const token = data?.token || await getKeyValue('token')
    const city = data?.city || await getKeyValue('city')
    let logInfo = {
        city: "The previous city isn't set. You have to input city -c [CITY_NAME].",
        token: "The previous token isn't set. You have to input token -t [TOKEN].",
        nothing: "Nothing was passed, and previous data doesn't exist. You have to input the token and city - use -h."
    }
    switch (true) {
        case (!!token && !!city): {
            getWeather(city)
            return true;
        }
        case (!!token && !city): {
            printInfo(logInfo.city)
            break;
        }
        case (!token && !!city): {
            printInfo(logInfo.token)
            break;
        }
        default:
            printError(logInfo.nothing)
            return false;
    }
}

export { checker }