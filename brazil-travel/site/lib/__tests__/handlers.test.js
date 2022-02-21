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