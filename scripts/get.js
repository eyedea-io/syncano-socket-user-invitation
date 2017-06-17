import { data, response, logger } from 'syncano-server'


const { debug } = logger('user-invitation-get')
const { key } = ARGS

data.invitations
  .where('key', 'eq', key)
  .first()
  .then(inv => {
    debug(inv)
    response.json(inv)
  })
  .catch(err => {
    console.log(err)
    err.response.text()
      .then(resp => {
        console.log(resp)
      })
  })
