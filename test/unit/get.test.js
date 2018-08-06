import {run} from '@syncano/test'

describe('get', () => {
  const meta = {
    token: process.env.E2E_CLI_ACCOUNT_KEY,
    user: {
      id: 5,
      username: 'fakeName'
    }
  }

  const fakeInvitation = {
    details: {company_id: 1234},
    email: 'test@email.com',
    key: 'aasdf123asdf123asdf',
    resourceID: '1234',
    resourceType: 'company'
  }

  it('internal error', async () => {
    require('@syncano/core').__setMocks({
      data: {
        invitations: {
          where: () => ({
            fields: () => ({
              first: jest.fn().mockImplementation(() => {
                throw new Error('error!')
              })
            })
         })
       }
      }
    })

    const result = await run('get')
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', 'error!')
  })

  it('can get invitation', async () => {
    require('@syncano/core').__setMocks({
      data: {
        invitations: {
          where: () => ({
            fields: () => ({
              first: jest.fn().mockImplementation(() => {
                return fakeInvitation
              })
            })
         })
       }
      }
    })

    const result = await run('get')
    expect(result).toHaveProperty('code', 200)
    expect(result).toHaveProperty('data', fakeInvitation)
  })
})
