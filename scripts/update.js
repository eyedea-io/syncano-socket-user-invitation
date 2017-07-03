import { data, response, logger } from 'syncano-server'


const { debug } = logger('user-invitation-update')
const { key, status } = ARGS

data.invitations
  .where('key', key)
  .update({status})
  .then(updateStatus => {
    debug('updateStatus')
    debug(updateStatus)
    response.json({key: updateStatus[0].content.key})
  })
  .catch(({ data }) => {
    console.log(data)
  })
