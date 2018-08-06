import {run} from '@syncano/test'

describe('invite', () => {

  it('can create invitation', async () => {
    const args = {
      email: 'test@email.com',
      resourceID: '1234',
      resourceType: 'company',
      details: {company_id: 1234}
    }
    const fakeInvitation = Object.assign({}, args, {key: 'aasdf123asdf123asdf'})

    require('@syncano/core').__setMocks({
      data: {
        invitations: {
          fields: () => ({
            create: jest.fn().mockImplementation(() => fakeInvitation)
          })
        }
      }
    })

    const result = await run('invite', {args})
    expect(result).toHaveProperty('code', 200)
    expect(result).toHaveProperty('data', fakeInvitation)
  })

  it('internal error', async () => {
    const args = {
      email: 'test@email.com',
      resourceID: '1234',
      resourceType: 'company',
      details: {company_id: 1234}
    }

    require('@syncano/core').__setMocks({
      data: {
        invitations: {
          fields: () => ({
            create: jest.fn().mockImplementation(() => {
              throw new Error('error!')
            })
          })
       }
      }
    })

    const result = await run('invite', {args})
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', 'error!')
  })
})
