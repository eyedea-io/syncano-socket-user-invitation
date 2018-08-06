import * as S from '@eyedea/syncano'
import {MODELS} from './constants'

interface Args {
  resourceID: string
  resourceType: string
}

class Endpoint extends S.Endpoint<Args> {
  counties: object
  async run(
    {response, data}: S.Core,
    {args}: S.Context<Args>
  ) {
    const invitations = await data.invitations
      .where('resourceID', String(args.resourceID))
      .where('resourceType', String(args.resourceType))
      .fields(MODELS.invitation)
      .list()

    this.logger.info(`Successfuly loaded invitations(${invitations.length}).`)
    response.success(invitations)
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch(err: Error) {
    this.syncano.response.json({message: err.message}, 400)
  }
}

export default ctx => new Endpoint(ctx)
