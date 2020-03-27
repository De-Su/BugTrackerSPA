import { Project } from './project';
import { User } from './user';
import { Image } from './image';
import { Comment } from './comment';

export interface Ticket {
    id: number;
    title: string;
    description: string;
    dateCreated: Date;
    dateUpdated: Date;
    priority: number;
    status: number;
    typeOfTicket: number;
    project: Project;
    userTo?: User;
    userFrom: User;
    images: Image[];
    comments?: Comment[];
}
