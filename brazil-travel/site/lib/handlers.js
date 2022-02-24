const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) =>
  res.render('about', { fortune: fortune.getFortune() })

exports.headers = (req, res) => {
  res.type('text/plain')
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
  res.send(headers.join('\n'))
}

exports.newsletterSignup = (req, res) => {
  res.render('newsletter-signup', { csrf: 'TOKEN' })
}

exports.newsletterSignupProcess = (req, res) => {
  console.log(`Form from querystring: ${req.query.form}`)
  console.log(`CSRF token: ${req.body._csrf}`)
  console.log(`Name: ${req.body.name}`)
  console.log(`Email: ${req.body.email}`)
  res.redirect(303, '/newsletter-signup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) =>
  res.render('newsletter-signup-thank-you')

exports.newsletter = (req, res) =>
  res.render('newsletter', { csrf: 'TOKEN' })

exports.vacationPhoto = (req, res) => {
  res.render('vacation-photo', {
    csrf: 'TOKEN',
    year: 2022,
    month: 1
  })
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
  console.log(`field data: ${JSON.stringify(fields)}`)
  console.log(`files: ${JSON.stringify(files)}`)
  res.redirect(303, '/contest/vacation-photo-thank-you')
}

exports.vacationPhotoThankYou = (req, res) =>
  res.render('vacation-photo-thank-you')

exports.vacationPhotoFetch = (req, res) =>
  res.render('vacation-photo-fetch', {
    csrf: 'TOKEN',
    year: 2022,
    month: 1
  })

exports.api = {
  newsletterSignup: (req, res) => {
    console.log(`CSRF token: ${req.body._csrf}`)
    console.log(`Name: ${req.body.name}`)
    console.log(`Email: ${req.body.email}`)
    res.send({ result: 'success' })
  },
  vacationPhotoContest: (req, res, fields, files) => {
    console.log(`field data: ${JSON.stringify(fields)}`)
    console.log(`files: ${JSON.stringify(files)}`)
    res.send({ result: 'success' })
  }
}

exports.notFound = (req, res) => {
  res.status(404)
  res.render('404')
}

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */