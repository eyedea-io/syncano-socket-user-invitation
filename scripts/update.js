import { data, response, logger } from 'syncano-server'


const { debug } = logger('user-invitation-update')
const { key, status } = ARGS

data.invitations
  .where('key', key)
  .first()
  .then(inv => {
    debug(inv)
    return data.invitations.update(inv.id, {status})
})
.then(updateStatus => {
  debug(updateStatus)
  response.json({key})
})
.catch(err => {
  console.log(err)
  err.response.text()
    .then(resp => {
      console.log(resp)
    })
})
