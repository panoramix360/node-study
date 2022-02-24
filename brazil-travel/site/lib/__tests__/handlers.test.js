const handlers = require('../handlers')

test('home page renders', () => {
  const req = {}
  const res = { render: jest.fn() }

  handlers.home(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('home')
})

test('about page renders with fortune', () => {
  const req = {}
  const res = { render: jest.fn() }

  handlers.about(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('about')
  expect(res.render.mock.calls[0][1])
    .toEqual(expect.objectContaining({
      fortune: expect.stringMatching(/\W/)
    }))
})

test('headers print info', () => {
  const req = { headers: { mock: 'data' } }
  const res = { type: jest.fn(), send: jest.fn() }

  handlers.headers(req, res)
  expect(res.type.mock.calls.length).toBe(1)
  expect(res.type.mock.calls[0][0]).toBe('text/plain')

  expect(res.send.mock.calls.length).toBe(1)
  expect(res.send.mock.calls[0][0]).toBe('mock: data')
})

test('newsletter signup page renders', () => {
  const req = {}
  const res = { render: jest.fn() }

  handlers.newsletterSignup(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('newsletter-signup')
  expect(res.render.mock.calls[0][1])
    .toEqual(expect.objectContaining({ csrf: 'TOKEN' }))
})

test('newsletter signup process redirect to thank you', () => {
  const req = {
    query: { form: 'form' },
    body: { _csrf: 'csrf', name: 'name', email: 'email' }
  }
  const res = { redirect: jest.fn() }

  handlers.newsletterSignupProcess(req, res)
  expect(res.redirect.mock.calls.length).toBe(1)
  expect(res.redirect.mock.calls[0][0]).toBe(303)
  expect(res.redirect.mock.calls[0][1]).toBe('/newsletter-signup/thank-you')
})

test('newsletter signup thank you page renders', () => {
  const req = {}
  const res = { render: jest.fn() }

  handlers.newsletterSignupThankYou(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('newsletter-signup-thank-you')
})

test('newsletter page renders', () => {
  const req = {}
  const res = { render: jest.fn() }

  handlers.newsletter(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('newsletter')
  expect(res.render.mock.calls[0][1])
    .toEqual(expect.objectContaining({ csrf: 'TOKEN' }))
})

test('newsletter signup api processes request', () => {
  const req = {
    body: { _csrf: 'csrf', name: 'name', email: 'email' }
  }
  const res = { send: jest.fn() }

  handlers.api.newsletterSignup(req, res)
  expect(res.send.mock.calls.length).toBe(1)
  expect(res.send.mock.calls[0][0])
    .toEqual(expect.objectContaining({ result: 'success' }))
})

test('vacation photo page renders', () => {
  const req = {}
  const res = { render: jest.fn() }

  handlers.vacationPhoto(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('vacation-photo')
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      csrf: 'TOKEN',
      year: 2022,
      month: 1
    })
  )
})

test('vacation photo contest processes form', () => {
  const req = {}
  const res = { redirect: jest.fn() }
  const fields = {}
  const files = {}

  handlers.vacationPhotoContestProcess(req, res, fields, files)
  expect(res.redirect.mock.calls.length).toBe(1)
  expect(res.redirect.mock.calls[0][0]).toBe(303)
  expect(res.redirect.mock.calls[0][1]).toBe('/contest/vacation-photo-thank-you')
})

test('vacation photo thank you page renders', () => {
  const req = {}
  const res = { render: jest.fn() }

  handlers.vacationPhotoThankYou(req, res)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('vacation-photo-thank-you')
})

test('404 handler resource', () => {
  const req = {}
  const res = { render: jest.fn(), status: jest.fn() }

  handlers.notFound(req, res)
  expect(res.status.mock.calls.length).toBe(1)
  expect(res.status.mock.calls[0][0]).toBe(404)

  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('404')
})

test('404 handler resource', () => {
  const error = new Error('some error')
  const req = {}
  const res = { render: jest.fn() }
  const next = jest.fn()

  handlers.serverError(error, req, res, next)
  expect(res.render.mock.calls.length).toBe(1)
  expect(res.render.mock.calls[0][0]).toBe('500')
})