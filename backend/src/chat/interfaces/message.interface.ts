

export enum RoomEnum{
    principal='principal',
    another='another_room',
}

export enum MessengerType {
    SENDER,
    RECEIVER,
};
export interface IMessage {
    userId?: string;
    receiverId:string|RoomEnum; //UserId or room constants
    message: string;
    createdAt: Date;
    type?: MessengerType
}


