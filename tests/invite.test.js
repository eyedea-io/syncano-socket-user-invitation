import sinon from 'sinon'
import {assert} from 'chai'
import {describe, it} from 'mocha'
import {run} from '@syncano/test'
import {createSyncanoCoreStub} from './utils'

describe('invite', () => {
  const meta = {
    token: process.env.E2E_CLI_ACCOUNT_KEY,
    user: {
      id: 5,
      username: 'fakeName'
    }
  }

  it('can create invitation', async () => {
    const args = {
      email: 'test@email.com',
      resource_id: '1234',
      resource_type: 'company',
      details: {company_id: 1234}
    }
    const fakeInvitation = Object.assign({}, args, {key: 'aasdf123asdf123asdf'})
    const SyncanoCoreStub = createSyncanoCoreStub({
      data: {
        invitations: {
          fields: () => ({
            create: sinon.stub().resolves(fakeInvitation)
          })
        }
      }
    })
    const mocks = {'@syncano/core': SyncanoCoreStub}

    const result = await run('invite', {args, meta}, {mocks})
    assert.propertyVal(result, 'code', 200)
    assert.deepPropertyVal(result, 'data', fakeInvitation)
  })

  it('internal error', async () => {
    const args = {
      email: 'test@email.com',
      resource_id: '1234',
      resource_type: 'company',
      details: {company_id: 1234}
    }
    const SyncanoCoreStub = createSyncanoCoreStub({
      data: {
        invitations: {
          fields: () => ({
            create: sinon.stub().rejects({response: 'error'})
          })
        }
      }
    })
    const mocks = {'@syncano/core': SyncanoCoreStub}

    const result = await run('invite', {args, meta}, {mocks})
    assert.propertyVal(result, 'code', 400)
    assert.deepPropertyVal(result.data, 'message', 'error')
  })
})
