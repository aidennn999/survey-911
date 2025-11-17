export interface AnonymousMessageFormData {
 subject: string;
 message: string;
}

export interface AnonymousMessage {
 id: string;
 name: string;
 email: string;
 subject: string;
 message: string;
 status: "unread" | "read" | "replied";
 createdAt: Date;
 updatedAt: Date;
}
