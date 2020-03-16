export interface TicketPut {
    id: number;
    title: string;
    description: string;
    priority: number;
    status: number;
    typeOfTicket: number;
    userToId?: number;
    userFromId: number;
}
