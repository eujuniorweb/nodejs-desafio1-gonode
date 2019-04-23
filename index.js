const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
const verificaIdade = (req, res, next) => {
  if (!req.body.age) {
    return res.redirect('/')
  } else {
    next()
  }
}
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('new')
})

app.post('/check', verificaIdade, (req, res) => {
  const age = req.body.age
  if (age >= 18) {
    return res.render('major', { age: age })
  } else {
    return res.render('minor', { age: age })
  }
})

app.listen(3000)
