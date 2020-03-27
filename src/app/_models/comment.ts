export interface Comment {
    id?: number;
    userId?: number;
    ticketId?: number;
    content: string;
    dateCreated?: Date;
}
