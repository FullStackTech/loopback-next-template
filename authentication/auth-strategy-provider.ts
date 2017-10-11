import { inject, Provider, ValueOrPromise } from '@loopback/context';
import { AuthenticationBindings, AuthenticationMetadata } from '@loopback/authentication';
import { HttpErrors } from '@loopback/rest';

import { Strategy } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { ApplicationConfigurationDefinition } from '../config';
import { AnonymousStrategy } from './anonymous-strategy';

export class AuthStrategyProvider implements Provider<Strategy> {
  constructor(
    @inject(AuthenticationBindings.METADATA) private metadata: AuthenticationMetadata,
    @inject('configuration') private configuration: ApplicationConfigurationDefinition
) { }

  value(): ValueOrPromise<Strategy> {
    if (!this.metadata) throw new HttpErrors.Unauthorized();

    if (this.metadata.strategy === 'Bearer') {
      return new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.configuration.authentication.jwtSecret,
        issuer: this.configuration.authentication.jwtIssuer,
        audience: this.configuration.authentication.jwtAudience
      }, this.verifyJwt);
    } else if (this.metadata.strategy === 'Anonymous') {
      return new AnonymousStrategy();
    } else {
      return Promise.reject(`The strategy ${this.metadata.strategy} is not available.`);
    }
  }

  verifyJwt(payload: Object, cb: Function) {
    return cb(null, (<any>payload).user);
  }
}
