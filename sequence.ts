import {
    inject
} from '@loopback/core';

import {
    FindRoute,
    InvokeMethod,
    ParseParams,
    parseOperationArgs,
    ParsedRequest,
    Reject,
    Send,
    ServerResponse,
    SequenceHandler,
    RestBindings
} from '@loopback/rest';

const CoreSequenceActions = RestBindings.SequenceActions;

import {
    AuthenticateFn,
    AuthenticationBindings,
} from '@loopback/authentication';

export class Sequence implements SequenceHandler {
    constructor(
        @inject(CoreSequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
        @inject(CoreSequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
        @inject(CoreSequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
        @inject(CoreSequenceActions.SEND) protected send: Send,
        @inject(CoreSequenceActions.REJECT) protected reject: Reject,
        @inject(AuthenticationBindings.AUTH_ACTION)
        protected authenticateRequest: AuthenticateFn,
    ) { }

    async handle(req: ParsedRequest, res: ServerResponse) {
        try {
            const route = this.findRoute(req);

            const user = await this.authenticateRequest(req);

            const args = await this.parseParams(req, route);
            const result = await this.invoke(route, args);
            this.send(res, result);
        } catch (err) {
            this.reject(res, req, err);
        }
    }
}
