import {randomBytes} from 'crypto';

export const IV = randomBytes(16);
export const KEY = 4;
export const SALT = 8;

export const jwtConstants = {
    secret: 'secretKey',
};

export const redisConstants = {
    USER_LIST: "users_list"
}

export const providerNames = {
    genericService: Symbol.for('genericService'),
    genericRepository: Symbol.for('genericRepository'),
};


export const socketEvents={
    message: 'message',
    usersList: 'users_list',
    enterRoom: 'enter_room',
    leaveRoom: 'leave_room',
    getAllMessages: 'get_all_messages'
}


export const messengerType={
    RECEIVER:'receiver',
    SENDER:'sender'

}