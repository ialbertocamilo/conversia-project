export class User {

    _id?: string;

    name: string | undefined;

    username: string | undefined;

    createdAt?: string;

    constructor(params: unknown) {
        Object.assign(this, params)
    }
}

export interface IOnlineUser {
    user?: User;
    socket_code: string
}