import Syncano from '@syncano/core'
import {MODELS} from './constants'

export default async ctx => {
  const {data, response, logger} = new Syncano(ctx)
  const {error, info, warn} = logger('user-invitation:get')
  const {key} = ctx.args

  if (!ctx.meta.user) {
    warn('Unauthorized request.')
    return response.json({message: 'Unauthorized.'}, 401)
  }

  try {
    const invitation = await data.invitations
      .where('key', key)
      .fields(MODELS.invitation)
      .first()

    info(`Invitation with key ${key} was found).`)
    response.success(invitation)
  } catch (err) {
    error(err)
    response.fail({message: err.response}, 400)
  }
}
