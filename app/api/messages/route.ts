import {NextRequest, NextResponse} from "next/server";
import {getDocs, collection, deleteDoc, doc} from "firebase/firestore";
import {db} from "@/lib/firebase/init";
import {getToken} from "next-auth/jwt";

export async function GET(request: NextRequest) {
 try {
  const token = await getToken({req: request});

  if (!token) {
   return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const messagesSnapshot = await getDocs(collection(db, "messages"));
  const messages = messagesSnapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
   createdAt: doc.data().createdAt?.toDate() || new Date(),
  }));

  return NextResponse.json(messages);
 } catch (error) {
  console.error("Error fetching messages:", error);
  return NextResponse.json({error: "Internal server error"}, {status: 500});
 }
}

export async function DELETE(request: NextRequest) {
 try {
  const token = await getToken({req: request});

  if (!token) {
   return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  const {searchParams} = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
   return NextResponse.json({error: "Message ID is required"}, {status: 400});
  }

  await deleteDoc(doc(db, "messages", id));

  return NextResponse.json({success: true});
 } catch (error) {
  console.error("Error deleting message:", error);
  return NextResponse.json({error: "Internal server error"}, {status: 500});
 }
}
