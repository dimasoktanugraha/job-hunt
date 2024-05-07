import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // /api/job/filter?category=id1,id1
  const filterCategory =
    searchParams.get("category") !== ""
      ? searchParams.get("category")?.split(",")
      : [];

  // [id1, id2]
  const categoryQuery: Prisma.JobWhereInput =
    filterCategory && filterCategory.length > 0
      ? {
          CategoryJob: {
            id: {
              in: filterCategory,
            },
          },
        }
      : {};

  const jobs = await prisma.job.findMany({
    where: { ...categoryQuery },
    include: {
      CategoryJob: true,
      Company: {
        include: {
          CompanyOverview: true,
        },
      },
    },
  });

  return NextResponse.json(jobs);
}
