import CompanyCard from "@/components/organisms/CompanyCard";
import FormFilterDynamic from "@/components/organisms/FormFilterDynamic";
import FormSearchDynamic from "@/components/organisms/FormSearchDynamic";
import JobCard from "@/components/organisms/JobCard";
import { JobType, companyType, filterFormType } from "@/types";
import Image from "next/image";
import React, { FC } from "react";

interface ExploreDataContainerProps {
  formFilter?: any;
  onSubmitFiter?: (val: any) => Promise<void>;
  filterForm?: filterFormType[];
  loading: boolean;
  title: string;
  subtitle: string;
  data: JobType[] | companyType[] | undefined;
  type: "job" | "company";
}

const ExploreDataContainer: FC<ExploreDataContainerProps> = ({
  formFilter,
  onSubmitFiter,
  filterForm,
  title,
  subtitle,
  loading,
  data,
  type,
}) => {
  return (
    <>
      <div className="bg-gray-200 px-32 py-16">
        <div className="mb-10">
          <div className="mx-auto mb-10 text-center flex justify-center gap-2">
            <span className="text-5xl font-semibold">Find your</span>
            <div className="relative">
              <span className="text-5xl font-semibold text-primary">
                {title}
              </span>
              <div className="absolute top-10 w-[220px] h-10">
                <Image
                  src="/images/pattern2.png"
                  alt="/images/pattern2.png"
                  fill
                />
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500">{subtitle}</div>
        </div>
        <div>
          <FormSearchDynamic />
        </div>
      </div>
      <div className="mt-20 mb-16 px-32 flex flex-row items-start gap-10">
        <div className="w-1/5">
          <FormFilterDynamic
            formFilter={formFilter}
            onSubmitFilter={onSubmitFiter}
            filterForms={filterForm}
          />
        </div>
        <div className="w-4/5">
          <div className="mb-8">
            <div className="text-3xl font-semibold">
              All {type === "job" ? "Jobs" : "Companies"}
            </div>
            <div className="text-muted-foreground">
              Showing {data?.length} result
            </div>
          </div>
          <div>
            {loading ? (
              <div>Loading</div>
            ) : (
              <>
                {type === "job" ? (
                  <div className="grid grid-cols-1 gap-6">
                    {data?.map((item: any, i: number) => (
                      <JobCard key={i} {...item} />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {data?.map((item: any, i: number) => (
                      <CompanyCard key={i} {...item} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreDataContainer;
