import bcrypt from "bcrypt";
import { auth } from "@/firebase";
import { db } from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      role,
      Name,
      resume,
      companyName,
      companyDescription,
      companyIndustry,
      companyId,
    } = await req.json();

    const doCreateCompany =
      companyId !== "" && companyId !== null && companyId !== undefined
        ? true
        : false;

    if (role === UserRole.JOB_SEEKER && !resume) {
      return new NextResponse("provide a resume", { status: 404 });
    }

    if (
      role === UserRole.EMPLOYER &&
      !companyId &&
      (!companyIndustry || !companyDescription || !companyName)
    ) {
      return new NextResponse("provide a company please", { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    let company = null;
    if (!doCreateCompany && role === UserRole.EMPLOYER) {
      company = await db.company.create({
        data: {
          name: companyName,
          description: companyDescription,
          industry: companyIndustry,
        },
      });
    }

    const userData = await db.user.create({
      data: {
        password: hashedPassword,
        email: email,
        role: role,
        Name: Name,
        resume: role === UserRole.JOB_SEEKER ? resume : undefined,
        companyId:
          role === UserRole.EMPLOYER
            ? doCreateCompany
              ? companyId
              : company?.id
            : undefined,
      },
    });

    return NextResponse.json(userData);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 501 });
  }
}
