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

exports.notFound = (req, res) => {
  res.status(404)
  res.render('404')
}

// Express recognizes the error handler by way of its four
// arguments, so we have to disable ESLint's no-unused-vars rule
/* eslint-disable no-unused-vars */
exports.serverError = (err, req, res, next) => res.render('500')
/* eslint-enable no-unused-vars */