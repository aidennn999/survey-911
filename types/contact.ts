export interface AnonymousMessage {
 id: string;
 name: string; // Selalu "Anonymous"
 email: string; // Selalu "anonymous@example.com" atau kosong
 subject: string;
 message: string;
 status: "unread" | "read" | "replied";
 ipAddress?: string; // Optional: untuk tracking
 userAgent?: string; // Optional: browser info
 createdAt: Date;
 updatedAt: Date;
}

export interface AnonymousMessageFormData {
 subject: string;
 message: string;
}
