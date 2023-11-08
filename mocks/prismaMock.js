/* global jest, beforeEach */
const { mockDeep, mockReset } = require('jest-mock-extended')

const prisma = require('../server/db/client')
const prismaMock = prisma

jest.mock('../server/db/client', () => mockDeep())

beforeEach(() => {
  mockReset(prismaMock)
})

module.exports = prismaMock;