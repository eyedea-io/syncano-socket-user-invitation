import sinon from 'sinon'
import {assert} from 'chai'
import {describe, it} from 'mocha'
import {run} from '@syncano/test'
import {buildStubObj, createSyncanoCoreStub} from './utils'

describe('invite', () => {
  const meta = {
    token: process.env.E2E_CLI_ACCOUNT_KEY,
    user: {
      id: 5,
      username: 'fakeName'
    }
  }

  it('can update invitation', async () => {
    const args = { status: 'finished' }
    const fakeInvitation = {
      details: {company_id: 1234},
      email: 'test@email.com',
      key: 'aasdf123asdf123asdf',
      resource_id: '1234',
      resource_type: 'company',
      status: 'finished'
    }

    const SyncanoCoreStub = createSyncanoCoreStub(
      buildStubObj(
        ['data', 'invitations', 'where()', 'update'],
        sinon.stub().resolves(fakeInvitation)
      )
    )
    const mocks = {'@syncano/core': SyncanoCoreStub}

    const result = await run('update', {args, meta}, {mocks})
    assert.propertyVal(result, 'code', 200)
    assert.deepPropertyVal(result, 'data', fakeInvitation)
  })

  it('internal error', async () => {
    const args = { status: 'fnished' }
    const SyncanoCoreStub = createSyncanoCoreStub(
      buildStubObj(
        ['data', 'invitations', 'where()', 'update'],
        sinon.stub().rejects({response: 'error'})
      )
    )
    const mocks = {'@syncano/core': SyncanoCoreStub}

    const result = await run('update', {args, meta}, {mocks})
    assert.propertyVal(result, 'code', 400)
    assert.deepPropertyVal(result.data, 'message', 'error')
  })
})
