import merge from 'lodash.merge'
import sinon from 'sinon'
import Syncano from '@syncano/core'

let syncanoStubbed = null

const createSyncanoCoreStub = (customMock) => {
  if (syncanoStubbed) {
    syncanoStubbed.restore()
  }
  syncanoStubbed = sinon.stub(Syncano, 'constructor')
    .callsFake(ctx => {
      let syncano = new Syncano(ctx)
      syncano = merge(syncano, customMock)

      if (customMock.data) {
        syncano.data = customMock.data
      }
      return syncano
    })
  return syncanoStubbed
}

const buildStubObj = (stubsArr, fn) => {
  const regexp = /(.*)\(\)$/i

  return stubsArr
    .reverse()
    .reduce((o, i) => {
      let match = regexp.exec(i)
      return match ? {[match[1]]: () => o} : {[i]: o}
    }, fn)
}

export {
  createSyncanoCoreStub,
  buildStubObj
}
