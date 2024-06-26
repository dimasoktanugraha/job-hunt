import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";
import { JobType, categoryJobType, companyType, optionType } from "@/types";
import { supabasePublicUrl } from "./supabase";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import prisma from "../../lib/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 8);

  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  return isMatch;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  return res.json() as Promise<JSON>;
}

export const dateFormat = (date: any, format: string = "DD MMM YYYY") => {
  // return moment(date).format(format);
  return dayjs(date).format(format);
};

export const parseCategories = (data: any, isLoading: boolean, error: any) => {
  if (!isLoading && !error && data) {
    return data.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        totalJobs: item._count.Job,
      };
    }) as categoryJobType[];
  }

  return [];
};

export const parseJobs = async (data: any, isLoading: boolean, error: any) => {
  if (!isLoading && !error && data) {
    return await Promise.all(
      data.map(async (item: any) => {
        const imageName = item.Company?.CompanyOverview[0].image;
        let imageUrl;

        if (imageName) {
          imageUrl = await supabasePublicUrl(imageName, "company");
        } else {
          imageUrl = "/images/company2.png";
        }

        const job: JobType = {
          id: item.id,
          name: item.roles,
          applicants: item.applicants,
          category: item.CategoryJob,
          desc: item.description,
          jobType: item.jobType,
          image: imageUrl,
          location: item.Company?.CompanyOverview[0].location,
          needs: item.needs,
          type: item.CategoryJob.name,
          skills: item.requiredSkills,
        };
        return job;
      })
    );
  }

  return [];
};

export const parseCompanies = async (
  data: any,
  isLoading: boolean,
  error: any
) => {
  if (!isLoading && !error && data) {
    return await Promise.all(
      data.map(async (item: any) => {
        const imageName = item.CompanyOverview[0].image;
        let imageUrl;

        if (imageName) {
          imageUrl = await supabasePublicUrl(imageName, "company");
        } else {
          imageUrl = "/images/company2.png";
        }

        const companyDetail = item.CompanyOverview[0];

        const company: companyType = {
          id: item.id,
          name: companyDetail?.name,
          image: imageUrl,
          dateFounded: companyDetail?.dateFounded,
          description: companyDetail?.description,
          employee: companyDetail?.employee,
          industry: companyDetail?.industry,
          location: companyDetail?.location,
          techStack: companyDetail?.techStack,
          website: companyDetail?.website,
          socmed: item.CompanySocialMedia[0],
          teams: item.CompanyTeam,
          totalJobs: item._count.Job,
        };
        return company;
      })
    );
  }

  return [];
};

export const parseCategoryToOptions = (
  data: any,
  isLoading: boolean,
  error: any,
  isIndustry?: boolean
) => {
  if (!isLoading && !error && data) {
    return data.map((item: any) => {
      return {
        id: isIndustry ? item.name : item.id,
        label: item.name,
      } as optionType;
    }) as optionType[];
  }

  return [];
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          return null;
        }

        const isMatch = await comparePassword(
          credentials?.password!!,
          user.password
        );

        if (isMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/signup",
    error: "auth/error",
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;

      return session;
    },
  },
};
