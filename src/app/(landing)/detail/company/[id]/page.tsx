import FormModalApply from "@/components/organisms/FormModalApply";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiCategory, BiLocationPlus } from "react-icons/bi";
import { HiOutlineArrowRight, HiOutlineOfficeBuilding } from "react-icons/hi";
import { AiOutlineFire } from "react-icons/ai";
import { BsBuildingExclamation, BsPeople } from "react-icons/bs";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import prisma from "../../../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { supabasePublicUrl } from "@/lib/supabase";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dateFormat } from "@/lib/utils";
import { CompanyTeam } from "@prisma/client";

interface CompanyDetailPageProps {}

async function getDetailCompany(id: string) {
  const data = await prisma.company.findFirst({
    where: {
      id,
    },
    include: {
      CompanyOverview: true,
      CompanySocialMedia: true,
      CompanyTeam: true,
      _count: {
        select: {
          Job: true,
        },
      },
    },
  });

  let imageUrl;

  if (data?.CompanyOverview[0].image) {
    imageUrl = await supabasePublicUrl(
      data?.CompanyOverview[0].image,
      "company"
    );
  } else {
    imageUrl = "/images/company2.png";
  }

  return { ...data, image: imageUrl };
}

const CompanyDetailPage = async ({ params }: { params: { id: string } }) => {
  const data = await getDetailCompany(params.id);

  return (
    <>
      {data && data.CompanyOverview && data.CompanySocialMedia ? (
        <>
          <div className="bg-slate-100 px-32 pt-10 pb-14">
            <div className="inline-flex gap-2 text-sm text-muted-foreground">
              <Link className="hover:underline hover:text-black" href="/">
                Home
              </Link>
              /{" "}
              <Link
                className="hover:underline hover:text-black"
                href="/find-companies"
              >
                Companies
              </Link>
              /{" "}
              <Link
                className="hover:underline hover:text-black"
                href={`/detail/company/${data.id}`}
              >
                {data?.CompanyOverview[0]?.name}
              </Link>
            </div>

            <div>
              <div className="mt-10 inline-flex gap-6 items-start">
                <Image
                  src={data.image}
                  alt={data.image}
                  width={150}
                  height={150}
                />
                <div>
                  <div className="inline-flex gap-4 items-center">
                    <span className="text-4xl font-semibold">
                      {data?.CompanyOverview[0]?.name}
                    </span>
                    <Badge>{data?._count?.Job} Jobs</Badge>
                  </div>
                  <div className="mt-2">
                    <Link href="/" className="font-semibold text-primary">
                      {data?.CompanyOverview[0]?.website}
                    </Link>
                  </div>
                  <div className="inline-flex items-center gap-10 mt-6">
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="bg-white p-3 rounded-full">
                          <AiOutlineFire className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Founded</div>
                        <div className="font-semibold">
                          {dateFormat(
                            data?.CompanyOverview[0]?.dateFounded,
                            "MMM, DD YYYY"
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="bg-white p-3 rounded-full">
                          <BsPeople className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Employee</div>
                        <div className="font-semibold">
                          {data?.CompanyOverview[0]?.employee}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="bg-white p-3 rounded-full">
                          <BiLocationPlus className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Location</div>
                        <div className="font-semibold">
                          {data?.CompanyOverview[0]?.location}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3">
                      <div>
                        <div className="bg-white p-3 rounded-full">
                          <HiOutlineOfficeBuilding className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Industry</div>
                        <div className="font-semibold">
                          {data?.CompanyOverview[0]?.industry}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-32 py-16 flex flex-row items-start gap-10">
            <div className="w-3/4">
              <div className="mb-16">
                <div className="text-3xl font-semibold mb-3">
                  Company Profile
                </div>
                <div
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: data?.CompanyOverview[0]?.description,
                  }}
                ></div>
              </div>
              <div>
                <div className="text-3xl font-semibold mb-4">Contact</div>
                <div className="flex items-start gap-5 w-[400px] flex-wrap">
                  <div className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold">
                    <FacebookIcon />
                    <span className="text-sm">
                      {data?.CompanySocialMedia[0]?.facebook}
                    </span>
                  </div>
                  <div className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold">
                    <TwitterIcon />
                    <span className="text-sm">
                      {data?.CompanySocialMedia[0]?.twitter}
                    </span>
                  </div>
                  <div className="p-2 border border-primary text-primary w-max inline-flex items-center gap-3 font-semibold">
                    <LinkedinIcon />
                    <span className="text-sm">
                      {data?.CompanySocialMedia[0]?.linkedin}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/4">
              <div className="text-3xl font-semibold mb-4">Tech Stack</div>
              <div className="text-gray-500 text-sm">
                Learn about the technology and tools that pattern uses.
              </div>
              <div className="mt-5 inline-flex gap-4">
                {data?.CompanyOverview[0]?.techStack.map(
                  (item: string, i: number) => (
                    <Badge key={item + i}>{item}</Badge>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}

      <div className="px-32">
        {data.CompanyTeam ? (
          <>
            <Separator />
            <div className="my-16">
              <div className="text-3xl font-semibold mb-4">Teams</div>
              <div className="grid grid-cols-5 gap-5 mt-5">
                {data?.CompanyTeam?.map((item: CompanyTeam) => (
                  <div key={item.id} className="border border-border px-3 py-5">
                    <div className="w-16 h-16 rounded-full mx-auto bg-gray-300" />
                    <div className="text-center my-4">
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="text-gray-500 text-xs">
                        {item.position}
                      </div>
                    </div>

                    <div className="mx-auto w-max">
                      <div className="inline-flex gap-2">
                        <InstagramIcon className="w-4 h-4 text-gray-500" />
                        <LinkedinIcon className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}
        <Separator />

        <div className="my-16">
          <div className="text-3xl font-semibold mb-4">Latest Jobs</div>
          <div className="grid grid-cols-5 gap-5 mt-5">
            {[0, 1, 2, 3].map((item: any, i: number) => (
              <div key={i} className="border border-border px-3 py-5">
                <div className="w-16 h-16 rounded-full mx-auto bg-gray-300" />
                <div className="text-center my-4">
                  <div className="font-semibold text-sm">Dimas Oktanugraha</div>
                  <div className="text-gray-500 text-xs">CEO</div>
                </div>

                <div className="mx-auto w-max">
                  <div className="inline-flex gap-2">
                    <InstagramIcon className="w-4 h-4 text-gray-500" />
                    <LinkedinIcon className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetailPage;
