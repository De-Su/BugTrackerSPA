import { User } from './user';
import { Ticket } from './ticket';

export interface Project {
    id: number;
    title: string;
    description: string;
    dateCreated: Date;
    user: User;
    tickets?: Ticket[];
}
