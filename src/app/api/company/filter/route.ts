import { Prisma } from "@prisma/client";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // /api/company/filter?category=id1,id1
  const filterCategory =
    searchParams.get("category") !== ""
      ? searchParams.get("category")?.split(",")
      : [];

  // [id1, id2]
  const categoryQuery: Prisma.CompanyWhereInput =
    filterCategory && filterCategory.length > 0
      ? {
          CompanyOverview: {
            every: {
              industry: {
                in: filterCategory,
              },
            },
          },
        }
      : {};

  const companies = await prisma.company.findMany({
    where: { ...categoryQuery },
    include: {
      CompanyOverview: true,
      CompanyTeam: true,
      CompanySocialMedia: true,
      _count: {
        select: { Job: true },
      },
    },
  });

  return NextResponse.json(companies);
}
