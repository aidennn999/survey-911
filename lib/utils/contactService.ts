import {
 collection,
 addDoc,
 getDocs,
 getDoc,
 doc,
 updateDoc,
 deleteDoc,
 query,
 orderBy,
 where,
 Timestamp,
} from "firebase/firestore";
import {firestore} from "@/lib/firebase/init";
import {AnonymousMessage, AnonymousMessageFormData} from "@/types/contact";

export async function addAnonymousMessage(
 data: AnonymousMessageFormData
): Promise<{success: boolean; messageId?: string; error?: string}> {
 try {
  const docRef = await addDoc(collection(firestore, "anonymous_messages"), {
   name: "Anonymous",
   email: "anonymous@example.com",
   subject: data.subject,
   message: data.message,
   status: "unread",
   createdAt: new Date(),
   updatedAt: new Date(),
  });

  return {success: true, messageId: docRef.id};
 } catch (error) {
  console.error("Error adding anonymous message:", error);
  return {success: false, error: "Failed to send message"};
 }
}

export async function getAnonymousMessages(): Promise<AnonymousMessage[]> {
 try {
  const q = query(
   collection(firestore, "anonymous_messages"),
   orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
   const data = doc.data();
   return {
    id: doc.id,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: data.status,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
   } as AnonymousMessage;
  });
 } catch (error) {
  console.error("Error fetching anonymous messages:", error);
  return [];
 }
}

export async function getAnonymousMessageById(
 id: string
): Promise<AnonymousMessage | null> {
 try {
  const docSnap = await getDoc(doc(firestore, "anonymous_messages", id));
  if (docSnap.exists()) {
   const data = docSnap.data();
   return {
    id: docSnap.id,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: data.status,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
   } as AnonymousMessage;
  }
  return null;
 } catch (error) {
  console.error("Error fetching anonymous message:", error);
  return null;
 }
}

export async function updateMessageStatus(
 id: string,
 status: "unread" | "read" | "replied"
): Promise<boolean> {
 try {
  await updateDoc(doc(firestore, "anonymous_messages", id), {
   status,
   updatedAt: new Date(),
  });
  return true;
 } catch (error) {
  console.error("Error updating message status:", error);
  return false;
 }
}

export async function deleteAnonymousMessage(id: string): Promise<boolean> {
 try {
  await deleteDoc(doc(firestore, "anonymous_messages", id));
  return true;
 } catch (error) {
  console.error("Error deleting anonymous message:", error);
  return false;
 }
}

export async function getMessageStats() {
 try {
  const messages = await getAnonymousMessages();
  const total = messages.length;
  const unread = messages.filter((msg) => msg.status === "unread").length;
  const read = messages.filter((msg) => msg.status === "read").length;
  const replied = messages.filter((msg) => msg.status === "replied").length;

  return {
   total,
   unread,
   read,
   replied,
  };
 } catch (error) {
  console.error("Error getting message stats:", error);
  return {
   total: 0,
   unread: 0,
   read: 0,
   replied: 0,
  };
 }
}
