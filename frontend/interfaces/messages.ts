
export enum MessengerType {
    SENDER,
    RECEIVER,
};
export interface IMessage {
    userId?: string;
    receiverId:string;
    message: string;
    createdAt: Date;
    type?: MessengerType
}

export interface IChatMessage{
    senderMessage:IMessage[],
    receiverMessage:IMessage[]
}