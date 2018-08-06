import {run} from '@syncano/test'

describe('update', () => {
  it('can update invitation', async () => {
    const args = { status: 'finished' }
    const fakeInvitation = {
      details: {company_id: 1234},
      email: 'test@email.com',
      key: 'aasdf123asdf123asdf',
      resourceID: '1234',
      resourceType: 'company',
      status: 'finished'
    }

    require('@syncano/core').__setMocks({
      data: {
        invitations: {
          where: () => ({
            update: jest.fn().mockImplementation(() => {
              return fakeInvitation
            })
          })
        }
      }
    })

    const result = await run('update', {args})
    expect(result).toHaveProperty('code', 200)
    expect(result).toHaveProperty('data', fakeInvitation)
  })

  it('internal error', async () => {
    const args = { status: 'fnished' }

    require('@syncano/core').__setMocks({
      data: {
        invitations: {
          where: () => ({
            update: jest.fn().mockImplementation(() => {
              throw new Error('error')
            })
          })
        }
      }
    })

    const result = await run('update', {args})
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', 'error')
  })
})
