import { Strategy } from 'passport-strategy';

export class AnonymousStrategy extends Strategy {

    authenticate(req: any): any {
        this.success({anonymous: true}, {anonymous: true});
    }

}