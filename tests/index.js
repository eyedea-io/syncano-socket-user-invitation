import Syncano from 'syncano-client'

import crypto from 'crypto'
import _ from 'lodash'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'


chai.use(chaiAsPromised);
const assert = chai.assert
const s = new Syncano(process.env.SYNCANO_PROJECT_INSTANCE)

describe('managing invitations', function() {

  let invitation = {
    email: 'test@email.com',
    resource_id: '1234',
    resource_type: 'company',
    details: {
      company_id: 1234
    }
  }

  it('invite', function(done) {
    s.post('user-invitation/invite', invitation)
      .then(response => {
        assert.property(response, 'key')
        invitation.key = response.key
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })

  it('get', function(done) {
    s.post('user-invitation/get', {key: invitation.key})
      .then(inv => {
        assert.property(inv, 'key')
        assert.property(inv, 'email')
        assert.property(inv, 'details')
        assert.property(inv, 'status')
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })

  it('update', function(done) {
    const params = {
      key: invitation.key,
      status: 'pending'
    }
    s.post('user-invitation/update', params)
      .then(response => {
        assert.property(response, 'key')
        invitation.key = response.key
        return s.post('user-invitation/get', {key: invitation.key})
      })
      .then(inv => {
        assert.propertyVal(inv, 'status', 'pending')
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })

  it('list', function(done) {
    const params = {
      resource_id: invitation.resource_id,
      resource_type: invitation.resource_type
    }
    s.post('user-invitation/list', params)
      .then(response => {
        assert(Array.isArray(response))
        response.map(inv => {
          assert.property(inv, 'key')
          assert.property(inv, 'email')
          assert.property(inv, 'details')
          assert.property(inv, 'status')
        })
        done()
      })
      .catch(err => {
        console.log(err)
        done(err)
      })
  })
})
