import * as S from '@eyedea/syncano'
import * as crypto from 'crypto'
import {MODELS} from './constants'

interface Args {
  details: string
  email: string
  resourceID: string
  resourceType: string
  status?: string
}

const DEFAULT_STATUS = 'pending'

class Endpoint extends S.Endpoint<Args> {
  async run(
    {response, data}: S.Core,
    {args}: S.Context<Args>
  ) {
    const invitation = await data
      .invitations
      .fields(MODELS.invitation)
      .create({
        details: args.details,
        email: args.email,
        key: crypto.randomBytes(16).toString('hex'),
        resourceID: args.resourceID,
        resourceType: args.resourceType,
        status: args.status || DEFAULT_STATUS,
        sentAt: new Date().toISOString(),
      })

    this.logger.info('Sucessfuly created invitation')
    response.success(invitation)
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch(err: Error) {
    this.syncano.response.json({message: err.message}, 400)
  }
}

export default ctx => new Endpoint(ctx)
