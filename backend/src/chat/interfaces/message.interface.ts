

export enum MessengerType {
    SENDER,
    RECEIVER,
};
export interface IMessage {
    userId: string;
    receiverId:string;
    message: string;
    time: Date;
    type?: MessengerType
}


