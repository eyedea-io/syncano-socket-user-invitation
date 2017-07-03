import { data, response, logger } from 'syncano-server'


const { debug } = logger('user-invitation-get')
const { key } = ARGS

data.invitations
  .where('key', key)
  .fields('key', 'details', 'email', 'resource_type', 'status')
  .first()
  .then(inv => {
    debug(inv)
    response.json(inv)
  })
  .catch(({data}) => {
    console.log(data)
  })
