export interface Ticket {
    id: number;
    title: string;
    description: string;
    dateCreated: Date;
    dateUpdated: Date;
    priority: number;
    projectId: number;
    status: number;
    typeOfTicket: number;

}
