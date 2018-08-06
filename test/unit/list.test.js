import {run} from '@syncano/test'

describe('list', () => {
  const fakeInvitationsList = [{
    details: {company_id: 1234},
    email: 'test@email.com',
    key: 'aasdf123asdf123asdf',
    resourceID: '1234',
    resourceType: 'company'
  }]

  it('internal error', async () => {
    require('@syncano/core').__setMocks({
      data: {
        invitations: {
          where: () => {
            throw new Error('error!')
          }
        }
      }
    })

    const result = await run('list')
    expect(result).toHaveProperty('code', 400)
    expect(result.data).toHaveProperty('message', 'error!')
  })

  it('can list invitations', async () => {
    require('@syncano/core').__setMocks({
      data: {
        invitations: {
          where: () => ({
            where: () => ({
              fields: () => ({
                list: jest.fn().mockImplementation(() => {
                  return fakeInvitationsList
                })
              })
            })
          })
        }
      }
    })

    const result = await run('list')
    expect(result).toHaveProperty('code', 200)
    expect(result).toHaveProperty('data', fakeInvitationsList)
  })
})
