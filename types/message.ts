export interface Message {
 id: string;
 name: string;
 email: string;
 message: string;
 createdAt: Date;
 read: boolean;
}

export interface MessageFormData {
 name: string;
 email: string;
 message: string;
}
