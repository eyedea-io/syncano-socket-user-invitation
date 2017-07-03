import { data, response, logger } from 'syncano-server'


const { debug } = logger('user-invitation-list')
const { resource_id, resource_type } = ARGS

data.invitations
  .where('resource_id', String(resource_id))
  .where('resource_type', String(resource_type))
  .fields('key', 'email', 'details', 'status')
  .list()
  .then(invitations => {
    response.json(invitations)
  })
  .catch(({data}) => {
    console.log(data)
  })
