import * as S from '@eyedea/syncano'
import {MODELS} from './constants'

interface Args {
  key: string
}

class Endpoint extends S.Endpoint<Args> {
  async run(
    {response, data}: S.Core,
    {args}: S.Context<Args>
  ) {
    const invitation = await data.invitations
      .where('key', args.key)
      .fields(MODELS.invitation)
      .first()

    this.logger.info(`Invitation with key ${args.key} was found).`)
    response.success(invitation)
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch(err: Error) {
    this.syncano.response.json({message: err.message}, 400)
  }
}

export default ctx => new Endpoint(ctx)
