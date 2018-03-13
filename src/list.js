import Syncano from '@syncano/core'
import {MODELS} from './constants'

export default async ctx => {
  const {data, response, logger} = new Syncano(ctx)
  const {warn, error, info} = logger('user-invitation:list')
  const {resource_id, resource_type} = ctx.args

  if (!ctx.meta.user) {
    warn('Unauthorized request.')
    return response.json({message: 'Unauthorized.'}, 401)
  }

  try {
    const invitations = await data.invitations
      .where('resource_id', String(resource_id))
      .where('resource_type', String(resource_type))
      .fields(MODELS.invitation)
      .list()

    info(`Successfuly loaded invitations(${invitations.length}).`)
    response.success(invitations)
  } catch (err) {
    error(err)
    response.fail({message: err.response}, 400)
  }
}
