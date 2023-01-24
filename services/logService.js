import chalk from 'chalk';
import dedent from 'dedent';

const printError = (err) =>{
  console.log(chalk.bgRed(' Error ') + ' '  + err)
}

const printSuccess = (msg) =>{
  console.log(chalk.bgGreen(' Success ') + ' '  + msg)
}

const printHelp = () =>{
  console.log(dedent`${chalk.bgCyan(' Help ')} 
  Без параметров - вывод погоды 
  -s [город] - для установки города
  -h - для помощи
  -t [API KEY] - для сохранения токена
  `)
}

const printWeather = (res, icon) =>{
  console.log(dedent`${chalk.bgBlue(' Weather ')} 
  Погода в городе ${res.name} 
  ${icon} ${res.weather[0].description}
  Температура: ${res.main.temp}
  Ощущается как: ${res.main.feels_like}
  Влажность: ${res.main.humidity}
  Скорость ветра: ${res.wind.speed}
  `)
}

export {printError, printSuccess, printHelp, printWeather}