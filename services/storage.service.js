import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), 'weather-data.json')

const saveKeyValue = (value) => {
    return new Promise(async (resolve, reject) => {
        const data = await getFileData(filePath) || {}
        const keys = Object.keys(value)
        keys.forEach((key) => {
            data[key] = value[key]
        })
        await promises.writeFile(filePath, JSON.stringify(data))
        resolve(data)
    })
}

const isExist = async (path) => {
    try {
        const data = await promises.stat(path)
        return data.size > 0
    } catch (error) {
        return false
    }
}

const getKeyValue = async (key) => {
    const data = await getFileData(filePath)
    return data[key] ? data[key] : null
}
 
const getFileData = async (path) => {
    if (await isExist(path)) {
        const file = await promises.readFile(path)
        return !!file.length ? JSON.parse(file) : null
    } else {
        return null
    }
}

export { saveKeyValue, getKeyValue }