import sinon from 'sinon'
import {assert} from 'chai'
import {describe, it} from 'mocha'
import {run} from '@syncano/test'
import {buildStubObj, createSyncanoCoreStub} from './utils'

describe('list', () => {
  const meta = {
    token: process.env.E2E_CLI_ACCOUNT_KEY,
    user: {
      id: 5,
      username: 'fakeName'
    }
  }

  const fakeInvitationsList = [{
    details: {company_id: 1234},
    email: 'test@email.com',
    key: 'aasdf123asdf123asdf',
    resource_id: '1234',
    resource_type: 'company'
  }]

  it('internal error', async () => {
    const SyncanoCoreStub = createSyncanoCoreStub(
      buildStubObj(
        ['data', 'invitations', 'where()', 'where()', 'fields()', 'list'],
        sinon.stub().rejects({response: 'error'})
      )
    )
    const mocks = {'@syncano/core': SyncanoCoreStub}

    const result = await run('list', {meta}, {mocks})
    assert.propertyVal(result, 'code', 400)
    assert.deepPropertyVal(result.data, 'message', 'error')
  })

  it('can list invitations', async () => {
    const SyncanoCoreStub = createSyncanoCoreStub(
      buildStubObj(
        ['data', 'invitations', 'where()', 'where()', 'fields()', 'list'],
        sinon.stub().resolves(fakeInvitationsList)
      )
    )

    const mocks = {'@syncano/core': SyncanoCoreStub}

    const result = await run('list', {meta}, {mocks})
    assert.propertyVal(result, 'code', 200)
    assert.deepPropertyVal(result, 'data', fakeInvitationsList)
  })
})
