import request from 'supertest'
import { Application } from 'express'
import app from '../app'

describe('GET /companies', () => {
  let application: Application

  beforeAll(() => {
    application = app
  })

  it('should return all companies', async () => {
    const response = await request(application).get('/companies')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('data')
    expect(response.body).toHaveProperty('pagination')
  })

  it('should return a single company', async () => {
    const response = await request(application).get('/companies/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success', true)
    expect(response.body).toHaveProperty('data')
    expect(response.body).toHaveProperty('pagination')
  })

  it('should return 404 if company not found', async () => {
    const response = await request(application).get('/companies/33333')
    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('success', false)
    expect(response.body).toHaveProperty('message', 'No companies found')
  })
})
