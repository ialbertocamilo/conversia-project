import {Inject, Injectable, Logger} from '@nestjs/common';
import {GenericService} from "../shared/generic-service";
import {ChatMessage, ChatMessageDocument} from "./schema/messages-schema";
import {IGenericRepository} from "../shared/generic-mongo-repository.service";
import {ChatMessageMongoRepository} from "./chat-message-mongo.repository";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {RedisCache} from "cache-manager-redis-yet";
import {redisConstants} from "../common/constants";
import {IOnlineUser} from "./interfaces/online-users.interface";
import {removeOnlineUserFromArray, removeSocketFromArray} from "../common/utils";
import {User} from "../user/schema/user-schema";

@Injectable()
export class ChatService extends GenericService<ChatMessage> {
    private readonly logger = new Logger()

    constructor(
        @Inject(ChatMessageMongoRepository)
        protected readonly repository: IGenericRepository<ChatMessageDocument>,
        @Inject(CACHE_MANAGER) private cacheManager: RedisCache
    ) {
        super(repository);
    }


    async addOnlineUser(user: User, clientId: string): Promise<IOnlineUser[]> {
        let prevUsersConnected = await this.cacheManager.store.get(redisConstants.USER_LIST) as Array<IOnlineUser>

        const onlineUser = {user: user, socket_code: clientId}
        prevUsersConnected = removeOnlineUserFromArray(onlineUser, prevUsersConnected)
        if (prevUsersConnected?.length > 0) {
            prevUsersConnected.push(<IOnlineUser>onlineUser)
            await this.cacheManager.store.set(redisConstants.USER_LIST, prevUsersConnected)
        } else
            await this.cacheManager.store.set(redisConstants.USER_LIST, [onlineUser])

        return await this.cacheManager.store.get(redisConstants.USER_LIST)
    }


    async removeSocketFromOnlineList(socketCode: string) {
        let prevUsersConnected = await this.cacheManager.store.get(redisConstants.USER_LIST) as Array<IOnlineUser>
        prevUsersConnected = removeSocketFromArray({user: null, socket_code: socketCode}, prevUsersConnected)
        await this.cacheManager.store.set(redisConstants.USER_LIST, prevUsersConnected)
        return await this.cacheManager.store.get(redisConstants.USER_LIST)
    }
    async getOnlineUsers() {
        return await this.cacheManager.store.get(redisConstants.USER_LIST)

    }

    async getAllMessagesByUserAndReceiver(userId: string, receiverId: string) {
        const messages = await this.repository.findAll({
            "$or": [
                {"userId": userId, "receiverId": receiverId}
            ]
        })
        const senderMessage = messages.filter(value => value.userId == userId)
        const receiverMessage = messages.filter(value => value.userId != userId)
        return {senderMessage, receiverMessage}
    }
}
