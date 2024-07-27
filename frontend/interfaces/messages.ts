
export const MessengerType={
    RECEIVER:'receiver',
    SENDER:'sender'

}
export interface IMessage {
    userId?: string;
    receiverId:string;
    message: string;
    createdAt?: Date;
}

export interface IChatMessage extends IMessage{
    type?: string
}