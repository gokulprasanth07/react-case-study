
export type Status = 'Backlog' | 'In Progress' | 'Done';

export interface Issue {
    id: string;
    title: string;
    description: string;
    status: Status;
    severity: number; // 1-5
    assignee: string;
    tags: string[];
    createdAt: string; // ISO date string
    userDefinedRank: number;
}

export interface User {
    name: string;
    role: 'admin' | 'contributor';
}
