import sinon from 'sinon'
import {assert} from 'chai'
import {describe, it} from 'mocha'
import {run} from '@syncano/test'
import {buildStubObj, createSyncanoCoreStub} from './utils'

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
    resource_id: '1234',
    resource_type: 'company'
  }

  it('internal error', async () => {
    const SyncanoCoreStub = createSyncanoCoreStub(
      buildStubObj(
        ['data', 'invitations', 'where()', 'fields()', 'first'],
        sinon.stub().rejects({response: 'error'})
      )
    )

    const mocks = {'@syncano/core': SyncanoCoreStub}

    const result = await run('get', {meta}, {mocks})
    assert.propertyVal(result, 'code', 400)
    assert.deepPropertyVal(result.data, 'message', 'error')
  })

  it('can get invitation', async () => {
    const SyncanoCoreStub = createSyncanoCoreStub(
      buildStubObj(
        ['data', 'invitations', 'where()', 'fields()', 'first'],
        sinon.stub().resolves(fakeInvitation)
      )
    )

    const mocks = {'@syncano/core': SyncanoCoreStub}

    const result = await run('get', {meta}, {mocks})
    assert.propertyVal(result, 'code', 200)
    assert.deepPropertyVal(result, 'data', fakeInvitation)
  })

  it('can\'t get invitation without being authenticated', async () => {
    const metaWithoutUser = Object.assign({}, meta, {user: undefined})
    const result = await run('get', {args: {}, meta: metaWithoutUser})
    assert.propertyVal(result, 'code', 401)
    assert.propertyVal(result.data, 'message', 'Unauthorized.')
  })
})
