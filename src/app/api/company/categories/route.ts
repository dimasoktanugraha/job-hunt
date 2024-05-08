import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.industry.findMany({});

  return NextResponse.json(categories);
}
