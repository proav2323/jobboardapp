import { auth } from "@/firebase";
import { db } from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });
    if (!user) {
      return null;
    }
    console.log(user);
    return user;
  } catch (e) {
    return null;
  }
}
