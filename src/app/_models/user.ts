import { Project } from './project';
import { Ticket } from './ticket';

export interface User {
    id: number;
    username: string;
    avatar: string;
    email: string;
    projects?: Project[];
    ticketsToMe?: Ticket[];
    ticketsFromMe?: Ticket[];
}
