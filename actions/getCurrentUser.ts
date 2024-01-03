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
      include: {
        jobApplications: {
          include: {
            job: {
              include: {
                company: {
                  include: {
                    Users: true,
                    jobs: true,
                  },
                },
                User: true,
              },
            },
            user: true,
          },
        },
        notifications: {
          orderBy: {
            CreatedAt: "desc",
          },
          include: {
            user: true,
            job: true,
          },
        },
        company: {
          include: {
            Users: true,
            jobs: true,
          },
        },
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    return null;
  }
}
