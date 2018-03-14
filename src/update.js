import Syncano from '@syncano/core'

export default async ctx => {
  const {data, response, logger} = new Syncano(ctx)
  const {warn, error, info} = logger('user-invitation:update')
  const {key, status} = ctx.args

  if (!ctx.meta.user) {
    warn('Unauthorized request.')
    return response.json({message: 'Unauthorized.'}, 401)
  }

  try {
    const invitation = await data.invitations
      // .fields(MODELS.invitation) - TODO: fields don't work with update
      .where('key', key)
      .update({status})

    info('Sucessfuly updated inviation')
    response.success(invitation)
  } catch (err) {
    error(err)
    response.fail({message: err.response}, 400)
  }
}
