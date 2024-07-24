
export enum MessengerType  {
    SENDER,
    RECEIVER,
};

export interface IMessage{
    sender:string;
    receiver:string;
    message:string;
    time:Date;
    type?:MessengerType
}