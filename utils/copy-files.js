const fs = require('fs')
const path = require('path')
const fsExtra = require('fs-extra')

const excludes = ['App.scss', 'examples', '__deprecated']

const fileHandler = (file) => {
  if (path.extname(file) === '.scss' || path.basename(file).indexOf('d.ts') !== -1) {
    try {
      excludes.map((exclude) => {
        if (file.indexOf(exclude) !== -1) {
          throw new Error(`In exclude files`)
        }
      })
    } catch (e) {
      return
    }
    let toPath = null
/*eslint quotes:0*/
    if (file.indexOf("src\\common") !== -1) {
      toPath = file.replace('src\\common', 'dist')
    } else {
      toPath = file.replace('src', 'dist')
    }
    if (toPath) {
      fsExtra.copy(file, toPath)
    }
  }
}

const walk = (dir, done, fileHandler = null) => {
  let results = []
  /* Начинаем считывать директорию асинхронно */
  fs.readdir(dir, function (err, list) {
    if (err) return done(err)
    /* Получаем длинну текущей папкм, очередь */
    let pending = list.length
    if (!pending) return done(null, results)
    /* Начинаем считывать текущую папку по файлам */
    list.forEach(function (file) {
      file = path.resolve(dir, file)
      /* начинаем считывать текущий файл */
      fs.stat(file, (err, stat) => {
        if (err) {
          done(err)
        }
        /* если это директория, то заново запускаем функцию */
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            if (err) {
              done(err)
            }
            results = results.concat(res)
            if (!--pending) done(null, results)
          }, fileHandler)
          /* добавляем файл в результаты и выводим, если это последний файл в директории */
        } else {
          results.push(file)
          if (fileHandler) {
            fileHandler(file)
          }
          if (!--pending) done(null, results)
        }
      })
    })
  })
}

walk('./src', function (err, results) {
  if (err) {
    console.log(err)
  }
}, fileHandler);
