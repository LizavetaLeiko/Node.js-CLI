#!/usr/bin/env nodes
import {getArgs} from './helpers/args.js'
import { printError, printHelp, printSuccess, printWeather } from './services/logService.js'
import { getKey, saveKeyValue, tokenDict} from './services/storageService.js'
import { getIcon, getWeather } from './services/api-service.js'

const saveToken = async (token) =>{
  if(!token.length){
    return printError('Не передан токен')
  }
  try{
    await saveKeyValue(tokenDict.token, token);
    printSuccess('Токен сохранен')
  } catch(e){
    printError(e.message)
  }
}

const saveCity = async (city) =>{
  if(!city.length){
    return printError('Не передан город')
  }
  try{
    await saveKeyValue(tokenDict.city, city);
    printSuccess('Город сохранен')
  } catch(e){
    printError(e.message)
  }
}

const getForcast = async () =>{
  try{
    let city = process.env.CITY ?? await getKey(tokenDict.city);
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon))
  }
  catch(e){
    if( e?.response?.status == 404){
      printError("Прогноза по такому городу нет, попробуйте задать другой город")
    } else if( e?.response?.status == 401){
      printError("Токен не валиден")
    } else{
      printError(e.message)
    }

  }
}

const initCLI = () => {
  const args = getArgs(process.argv)
  if (args.h){
    return printHelp()
  } else if (args.s){
    return saveCity(args.s)
  } else if (args.t){
    return saveToken(args.t)
  } else{
    return getForcast('moscow')
  };
}

initCLI()