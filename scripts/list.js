import { data, response, logger } from 'syncano-server'


const { debug } = logger('user-invitation-list')
const { resource_id, resource_type } = ARGS

data.invitations
  .where('resource_id', 'eq', String(resource_id))
  .where('resource_type', 'eq', String(resource_type))
  .list()
  .then(invitations => {
    response.json(invitations.map(({key, email, details, status }) => {
      return { key, email, details, status }
    }))
  })
  .catch(err => {
    console.log(err)
    err.response.text()
      .then(resp => {
        console.log(resp)
      })
  })
