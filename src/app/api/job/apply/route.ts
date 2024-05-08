import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  const result = await prisma.applicant.create({
    data,
  });

  await prisma.job.update({
    where: {
      id: data.jobId,
    },
    data: {
      applicants: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(result);
}
