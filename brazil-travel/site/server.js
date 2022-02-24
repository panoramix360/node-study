const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')

const weather = require('./lib/middleware/weather')
const handlers = require('./lib/handlers')

const app = express()

const port = process.env.PORT || 3001

app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.disable('x-powered-by')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(`${__dirname}/public`))

app.get('/', handlers.home)
app.get('/about', handlers.about)
app.get('/headers', handlers.headers)

// Form handling (without javascript)
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// Form handling (with fetch)
app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

// File handling
app.get('/vacation-photo', handlers.vacationPhoto)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message })
    handlers.vacationPhotoContestProcess(req, res, fields, files)
  })
})
app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoThankYou)

// File handling (with fetch)
app.get('/vacation-photo-fetch', handlers.vacationPhotoFetch)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).send({ error: err.message })
    handlers.api.vacationPhotoContest(req, res, fields, files)
  })
})

app.use(weather)

app.use(handlers.notFound)
app.use(handlers.serverError)

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; press Ctrl-C to terminate.`)
  })
} else {
  module.exports = app
}