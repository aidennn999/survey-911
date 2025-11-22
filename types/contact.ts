export interface AnonymousMessageFormData {
 subject: string;
 message: string;
}

export interface AnonymousMessage {
 id: string;
 subject: string;
 message: string;
 status: "unread" | "read";
 createdAt: Date;
}
