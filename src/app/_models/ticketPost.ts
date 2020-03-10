export interface TicketPost {
    title: string;
    description: string;
    priority: number;
    status: number;
    typeOfTicket: number;
    projectId: number;
    userToId?: number;
    userFromId: number;
}
